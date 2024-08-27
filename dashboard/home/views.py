from django.shortcuts import render
import asyncio
import random
from django.http import StreamingHttpResponse
import json
import datetime

async def stream_sensor_data(request):
    async def event_stream():
        while True:
            sensor_data = {
                "id": random.randint(0,10000),
                "hall_sensor" : random.randint(0,1024),
                "co2_sensor" : random.randint(0,1024),
                "timestamp" : datetime.datetime.now().strftime("%H:%M:%S")
            }
            yield f'data:{json.dumps(sensor_data)} \n\n'
            await asyncio.sleep(1)
    return StreamingHttpResponse(event_stream(), content_type='text/event-stream')
