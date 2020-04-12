import json
import boto3
from random import randrange

#Establish connection with quotation database
dynamodb = boto3.resource('dynamodb', region_name='us-east-1')


def lambda_handler(event, context):
    #Error message (as quotation) if something fails
    quote = 'Everything fails all the time. '
    author = 'Backend Service'

    try:
        # get all quotes from quotation db
        table = dynamodb.Table('quotations')
        response = table.scan()
        quotesNum = len(response['Items'])
    except:
        quotesNum = -1

    # get random quote if there are some... 
    if quotesNum > 0:
        randNum = randrange(quotesNum)
        quote = response['Items'][randNum]['quote']
        author = response['Items'][randNum]['author']
    elif quotesNum < 0:
        quote = quote + '[quotation database not found!]'
    else:
        quote = quote + '[no quotes found in database!]'

    # set parameter defaults
    sentiment = 'neutral'
    
    data = {'quote': quote, 'author': author, 'sentiment': sentiment, 'serverip': 'lambda'}
    return {
        'statusCode': 200,
        'body': json.dumps(data)
    }

