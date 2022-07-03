import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from statsmodels.tsa.stattools import adfuller
from statsmodels.tsa.vector_ar.var_model import VAR
from sklearn.metrics import mean_squared_error
import datetime
# from fbprophet import Prophet
from datetime import date
import pickle


def getCategory(s_date,e_date,category):

  if category == "1":
      with open('arima_weights/cat1.pkl' , 'rb') as f:
        result, train = pickle.load(f)

  elif category == "2":
      with open('arima_weights/cat2.pkl' , 'rb') as f:
        result, train = pickle.load(f)

  else:
      with open('arima_weights/cat3.pkl' , 'rb') as f:
        result, train = pickle.load(f)

  lagged_Values = train.values[-10:]
  return format_date(s_date,e_date,category,result,lagged_Values)



def counting_of_periods(f_date,l_date):

  delta = l_date - f_date

  count = delta.days

  count = count//5 + 1

  print(count)

  return count



def arima(startdate,enddate,categ,result,lagged_Values):

  pred = result.forecast(y=lagged_Values, steps=counting_of_periods(startdate,enddate))
  # print("hello")
  idx = pd.date_range(startdate, periods=counting_of_periods(startdate,enddate), freq='5D')
  df_forecast=pd.DataFrame(data=pred, index=idx, columns=['count1_2d', 'Priority_Forecast'])
  #df_forecast['count_Forecast'] = df32['count1'].iloc[-test_obs-1] + df_forecast['count1_2d'].cumsum()
  #df_forecast.drop(['count1_2d', 'count_Forecast'], axis=1, inplace=True)
  df_forecast=df_forecast.to_json()
  return df_forecast


def format_date(startdate, enddate,categ,result,lagged_date):
  startdate= datetime.datetime.strptime(startdate, "%d%m%Y").date()
  enddate= datetime.datetime.strptime(enddate, "%d%m%Y").date()
  return arima(startdate,enddate,categ,result,lagged_date)
  # return prophet_model(startdate,enddate,categ)

# ***** Phophet model ***
# Returns list of numbers as per the periods
def prophet_model(startdate,enddate,category):
    period = counting_of_periods(startdate,enddate)
    print("Period is ")
    print(period)
    try:
        if category == '1':
            with open('phophet_weights/cat1_ph.pkl' , 'rb') as f:
                step,m = pickle.load(f)
        elif category == '2':
            with open('phophet_weights/cat2_ph.pkl' , 'rb') as f:
                step,m = pickle.load(f)
        else:
            with open('phophet_weights/cat3_ph.pkl' , 'rb') as f:
                step,m = pickle.load(f)

        future = m.make_future_dataframe(periods=period)
        forecast = m.predict(future)
        return forecast[step:]['yhat'].to_json()

    except Exception as E:
        print(E)
        print( 'Something went wrong, Please check category label')
        return []


from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Info(BaseModel):
  s_date:str
  e_date:str
  categ:str


@app.post("/arima/")

async def mainfunction(info : Info):

  info = info.dict()

  print("-------------------------",info)

  categ = info['categ']
  s_date = info['s_date']
  e_date = info['e_date']


  content=getCategory(s_date,e_date,categ)
  print(content)
  return JSONResponse(content)