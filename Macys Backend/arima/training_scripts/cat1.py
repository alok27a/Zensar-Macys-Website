import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from statsmodels.tsa.stattools import adfuller
from statsmodels.tsa.vector_ar.var_model import VAR
from sklearn.metrics import mean_squared_error
import datetime
from datetime import date
import pickle
df = pd.read_csv('Pri1.csv')
print(df)
df.set_index('date', inplace = True)
print(df)

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

with open('cat1.pkl', 'wb') as files:
    pickle.dump((result,train), files)

