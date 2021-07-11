library(dplyr)
library(tidyverse)
library(tidyr)
library(readr)  
library(magrittr)
library(echarts4r)
all_data <- read_csv("data/all_data.csv", 
                     col_types = cols(aisp = col_character()), 
                     locale = locale(encoding = "ISO-8859-1"))

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

# Prop_AISP <- c(rep(AISP[6],72),
#                rep(AISP[7],72),
#                rep(AISP[9],72),
#                rep(AISP[12],72),
#                rep(AISP[14],72),
#                rep(AISP[15],72),
#                rep(AISP[16],72),
#                rep(AISP[1],72),
#                rep(AISP[2],72),
#                rep(AISP[3],72),
#                rep(AISP[4],72),
#                rep(AISP[5],72),
#                rep(AISP[8],72),
#                rep(AISP[10],72),
#                rep(AISP[11],72),
#                rep(AISP[13],72))


all_data %<>% arrange(ano) %>%
             arrange(mes) %>%
             mutate(Prop_AISP)

row.names(all_data) <- Prop_AISP

json <- jsonlite::read_json('data/aispmap.geojson')


mes_data_aisp <- all_data %>% filter(ano %in% c(2014)) %>% filter(mes %in% c("Jan")) 
row.names(mes_data_aisp) <- AISP_2

mes_data_aisp %>% 
  dplyr::mutate(states = row.names(.)) %>%
  e_charts(states) %>%
  e_map_register("ssp", json) %>%
  e_map(roubo_veiculos, map = "ssp") %>%
  e_visual_map(roubo_veiculos)


  json <- jsonlite::read_json("https://echarts.apache.org/examples/data/asset/geo/USA.json")

  USArrests %>%
    dplyr::mutate(states = row.names(.)) %>%
    e_charts(states) %>%
    e_map_register("USA", json) %>%
    e_map(Murder, map = "USA") %>%
    e_visual_map(Murder)





