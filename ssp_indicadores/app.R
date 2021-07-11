library(shiny)
library(echarts4r)
library(dplyr)
library(DT)
library(tidyverse)
library(tidyr)
library(readr)  
library(magrittr)
library(png)

all_data <- read_csv("data/all_data.csv", 
                     col_types = cols(aisp = col_character()), 
                     locale = locale(encoding = "ISO-8859-1"))
all_data %<>% mutate(mes_order = mes)
all_data %<>% transform(mes = month.abb[mes])
all_data %<>% filter(ano < 2020)

AISP = c('AISP 01','AISP 02','AISP 03','AISP 04',
         'AISP 05','AISP 06','AISP 07','AISP 08',
         'AISP 09','AISP 10','AISP 11','AISP 12',
         'AISP 13','AISP 14','AISP 15','AISP 16')

AISP_2 <- c(AISP[6],  AISP[7],  AISP[9],  AISP[12],
            AISP[14],  AISP[15],  AISP[16],  AISP[1],  AISP[2],
            AISP[3],  AISP[4],  AISP[5],  AISP[8],  AISP[10],
            AISP[11],  AISP[13])


Prop_AISP <- c(rep(AISP_2,72))

all_data %<>% arrange(ano) %>%
    arrange(mes_order) %>%
    mutate(Prop_AISP)

all_data_ori <- all_data

ui <- fluidPage(sidebarPanel(titlePanel(title=div(img(src="CDnaEP_[VersaoHORIZONTAL-COR]_30dpi.png"))),tags$p('O projeto Ciência de Dados na Escola Pública tem selecionados dados 
 disponibilidados de forma aberta e os transformado em materiais de 
 mais fácil acesso aos estudantes para atividades escolares 
 que os aproximem de forma mais profunda da cidade que vivemos. 
 Especialmente neste dashboard apresentamos dados de indicadores de 
 segurança pública para a cidade de Salvados, bem como as informações
 das áreas integradas de segurança pública AISP')),
    mainPanel(
    tags$h3(''),
    tags$p('Fonte: Secretaria de Segurança Pública da Bahia'),
    tags$p(
        'SSP-BA',
        tags$a(
            'http://www.ssp.ba.gov.br',
            href = 'http://www.ssp.ba.gov.br'
        )
    ),
    fluidRow(tags$h4('Ocorrências de crimes - Salvador'),
        column(6, echarts4rOutput('chart')),
        tags$h4('Ocorrências de crimes - AISP'),
        column(6, echarts4rOutput('maps'))
    ),
    tags$h3(textOutput('filter_title')),
    DTOutput('dt'))
    )

server <- function(input, output, session) {
    
    # Track the filter date in a reactive value so it can be
    # update independently of the chart
    filter_date <- reactiveVal(value = NULL)
    
    # Update the filter date on click on data point
    observeEvent(input$chart_clicked_data, {
        filter_date(input$chart_clicked_data$value[1])
    })
    
    # Reset the filter date
    observeEvent(input$reset_filter, {
        filter_date(NULL)
    })
    
    # Display the filter date
    output$filter_title <- renderText({
        if (is.null(filter_date())) return('Tabela de Dados')
        paste('Tabela de Dados', filter_date())
    })
    
    # Create an interactive chart
    output$chart <- renderEcharts4r({
        all_data %>%
#            summarise(total = sum(Value)) %>% 
            select(ano, mes_order, aisp, roubo_onibus, roubo_veiculos,furto_veiculos) %>%
            group_by(ano,mes_order) %>% summarise(roubo_onibus=sum(roubo_onibus), 
                                            roubo_veiculos=sum(roubo_veiculos),
                                            furto_veiculos = sum(furto_veiculos)) %>%
#             tidyr::gather("Key","Value",roubo_onibus, roubo_veiculos,furto_veiculos,
#                              -mes_order,-ano,-aisp) %>%
            group_by(ano) %>% 
            e_charts(mes_order, timeline = TRUE) %>% 
            e_bar(roubo_onibus,stack = 'a', itemStyle = list(
                borderRadius = 20)) %>%
            e_bar(roubo_veiculos, stack = 'b', itemStyle = list(
                borderRadius = 20)) %>%
            e_bar(furto_veiculos,stack = 'c', itemStyle = list(
                borderRadius = 20)) %>%
            e_axis_labels(
                x = "mês",
                y = "Nº"
            ) %>%
            e_labels(fontSize = 9) %>%
            e_tooltip() %>%
            e_title()
    })
    
    # Create map
    output$maps <- renderEcharts4r({
        json <- jsonlite::read_json('data/aispmap.geojson')
        
        mes_data_aisp <- all_data_ori %>% filter(ano %in% c(2019)) %>% filter(mes_order %in% c(12)) 
        row.names(mes_data_aisp) <- AISP_2
        mes_data_aisp %>% 
            dplyr::mutate(states = row.names(.)) %>%
            tidyr::gather("Key",  "Value", roubo_onibus, roubo_veiculos,furto_veiculos) %>% 
            group_by(Key) %>% 
            e_charts(states,timeline = TRUE) %>%
            e_map_register("ssp", json) %>%
            e_map(Value, map = "ssp") %>%
            e_visual_map(min = 0, max = 100) %>%
            e_timeline_serie(
                title = list(
                    list(text = "Furto de veículos 12/2019", subtext = "Número de ocorrências por AISP"),
                    list(text = "Roubos de ônibus 12/2019", subtext = "Número de ocorrências por AISP"),
                    list(text = "Roubos de veículos 12/2019", subtext = "Número de ocorrências por AISP")
                )
            )
        
        
        
    })
    
    # Create a table with detailed information
    output$dt <- renderDT({
        all_data_ori_tab <- all_data_ori %>% select(ano, mes_order, aisp, roubo_onibus, roubo_veiculos,furto_veiculos) %>%
            group_by(ano,mes_order) %>% summarise(roubo_onibus=sum(roubo_onibus), 
                                            roubo_veiculos=sum(roubo_veiculos),
                                            furto_veiculos = sum(furto_veiculos))
        
        datatable(
            all_data_ori_tab, 
            selection = 'none', 
            rownames = FALSE,
            options = list(dom = 'tip', searching = FALSE,
                pageLength = 12) # select table elements to show
        )
    })
    

}

shinyApp(ui, server)