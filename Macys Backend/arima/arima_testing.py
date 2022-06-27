import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from statsmodels.tsa.stattools import adfuller
from statsmodels.tsa.vector_ar.var_model import VAR
from sklearn.metrics import mean_squared_error
import datetime
from datetime import date
df = pd.read_csv('Pri4.csv')
print(df)
df.set_index('date', inplace = True)
print(df)


def counting_of_periods(f_date,l_date):

  #f_date = date(2021, 12, 2)

  #l_date = date(2022, 3, 31)

  delta = l_date - f_date

  count = delta.days

  count = count//5 + 1

  print(count)

  return count



def adf_test(series,title=''):

    """

    Pass in a time series and an optional title, returns an ADF report

    """

    print(f'Augmented Dickey-Fuller Test: {title}')

    result = adfuller(series.dropna(),autolag='AIC') # .dropna() handles differenced data

    labels = ['ADF test statistic','p-value','# lags used','# observations']

    out = pd.Series(result[0:4],index=labels)

    for key,val in result[4].items():

        out[f'critical value ({key})']=val

    print(out.to_string())          # .to_string() removes the line "dtype: float64"

    if result[1] <= 0.05:

        print("Strong evidence against the null hypothesis")

        print("Reject the null hypothesis")

        print("Data has no unit root and is stationary")

    else:

        print("Weak evidence against the null hypothesis")

        print("Fail to reject the null hypothesis")

        print("Data has a unit root and is non-stationary")



df_difference=df['count1'].diff()
df_difference.dtypes

df32=pd.DataFrame({'date':df_difference.index, 'priority_count':df_difference.values})
print(df32)

df32.set_index('date', inplace = True)
print(df32)

df32['Priority']=df['Priority'].values
df32.rename(columns = {'priority_count':'count1'}, inplace = True)
test_obs = 50
train = df32[:-test_obs]
test = df32[-test_obs:]
train.isnull().sum().sum()
train=train.fillna(0)


for i in range(30):

    model = VAR(train)
    results = model.fit(i)
    print('Order =', i)
    print('AIC: ', results.aic)
    print('BIC: ', results.bic)
    print()

result = model.fit(5)
result.summary()

lagged_Values = train.values[-10:]


def arima(startdate,enddate):

  pred = result.forecast(y=lagged_Values, steps=counting_of_periods(startdate,enddate))
  print("hello")
  idx = pd.date_range(startdate, periods=counting_of_periods(startdate,enddate), freq='5D')
  df_forecast=pd.DataFrame(data=pred, index=idx, columns=['count1_2d', 'Priority_Forecast'])
  df_forecast['count_Forecast'] = df32['count1'].iloc[-test_obs-1] + df_forecast['count1_2d'].cumsum()
  df_forecast.drop(['count1_2d', 'count_Forecast'], axis=1, inplace=True)
  df_forecast=df_forecast.to_json( )
  return df_forecast


def format_date(startdate, enddate):
  startdate= datetime.datetime.strptime(startdate, "%d%m%Y").date()
  enddate= datetime.datetime.strptime(enddate, "%d%m%Y").date()
  #print(a)
  return arima(startdate,enddate)
  #a=datetime.date(2021, 12, 2)









#!pip install fastapi


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


@app.post("/arima/")

async def mainfunction(info : Info):

  info = info.dict()

  print("-------------------------",info)

  s_date = info['s_date']
  e_date = info['e_date']

  print("date---->",info)
  print(format_date(s_date,e_date))



  return JSONResponse(content=format_date(s_date,e_date))
