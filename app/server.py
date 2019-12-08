"""
This application was built based on Jeremy Howard's Bear Classifier Webapp. It uses the Fast AI Library, Intel's Haarcascades and Croppie JS plugin

"""


import aiohttp
import asyncio
import uvicorn
import base64
import cv2
import numpy as np
import os
from fastai import *
from fastai.vision import *
from io import BytesIO
from starlette.applications import Starlette
from starlette.middleware.cors import CORSMiddleware
from starlette.responses import HTMLResponse, JSONResponse, PlainTextResponse, RedirectResponse
from starlette.staticfiles import StaticFiles
from PIL import Image


export_file_url = 'https://drive.google.com/uc?export=download&id=1uj5o7n116mq-KY0XPI9AH0vwYKnySNUD'
export_file_name = 'export.pkl'

classes = ['5 to 7%', '7.5 to 9%', '10 to 12%', '13 to 15%',
            '16 to 17%', '18 to 19%', '20 to 22%', '23 to 25%', '26 to 28%',
            '30 to 33%', '34 to 38%', '40+%',
            'Error - please upload image as described in instructions above!',
            '8 to 11%', '13 to 15.5%', '16 to 18%', '19 to 20%', '21 to 23%',
            '24 to 25%', '26 to 28.5%', '29 to 30%', '31 to 33%', '35 to 39%',
            '40+ %']
path = Path(__file__).parent

app = Starlette()
app.add_middleware(CORSMiddleware, allow_origins=['*'], allow_headers=['X-Requested-With', 'Content-Type'])
app.mount('/static', StaticFiles(directory='app/static'))



async def download_file(url, dest):
    if dest.exists(): return
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            data = await response.read()
            with open(dest, 'wb') as f:
                f.write(data)


async def setup_learner():
    await download_file(export_file_url, path / export_file_name)
    try:
        learn = load_learner(path, export_file_name)
        return learn
    except RuntimeError as e:
        if len(e.args) > 0 and 'CPU-only machine' in e.args[0]:
            print(e)
            message = "\n\nThis model was trained with an old version of fastai and will not work in a CPU environment.\n\nPlease update the fastai library in your training environment and export your model again.\n\nSee instructions for 'Returning to work' at https://course.fast.ai."
            raise RuntimeError(message)
        else:
            raise


loop = asyncio.get_event_loop()
tasks = [asyncio.ensure_future(setup_learner())]
learn = loop.run_until_complete(asyncio.gather(*tasks))[0]
loop.close()


async def facecrop(image):


    global sub_face1
    global sub_face2
    global sub_face3
    global sub_face4

    women_file_name = 'women_cascade.xml'
    men_file_name = 'men_cascade.xml'
    bwomen_file_name = 'bwomen_cascade.xml'
    bmen_file_name = 'bmen_cascade.xml'

    women_url = 'https://drive.google.com/uc?export=download&id=1u5L5e1Z_-TSUlE9Lkb3HngpkVY-phU3O'
    men_url = 'https://drive.google.com/uc?export=download&id=1F4xFb652COZPbAy3Ix81EoGY8iHPHWt1'
    bwomen_url = 'https://drive.google.com/uc?export=download&id=1UguSYu4_VAsDBr5NTfVP705WUPfsn1bL'
    bmen_url = 'https://drive.google.com/uc?export=download&id=1MoBwB5Tm_2_JCAK95MsZsFgUpSCe3-J4'


    await download_file(women_url, path / women_file_name)
    await download_file(men_url, path / men_file_name)
    await download_file(bwomen_url, path / bwomen_file_name)
    await download_file(bmen_url, path / bmen_file_name)

    f = str(path)

    cascade1 = cv2.CascadeClassifier(f + '/' + women_file_name)
    cascade2 = cv2.CascadeClassifier(f + '/' + men_file_name)
    cascade3 = cv2.CascadeClassifier(f + '/' + bwomen_file_name)
    cascade4 = cv2.CascadeClassifier(f + '/' + bmen_file_name)


    img = cv2.imread(image)
    minisize = (img.shape[1],img.shape[0])
    miniframe = cv2.resize(img, minisize)


    faces1 = cascade1.detectMultiScale(miniframe, scaleFactor=1.3, minNeighbors=12, minSize=(700, 950))
    faces2 = cascade2.detectMultiScale(miniframe, scaleFactor=1.3, minNeighbors=12, minSize=(700, 950))
    faces3 = cascade3.detectMultiScale(miniframe, scaleFactor=1.3, minNeighbors=12, minSize=(700, 950))
    faces4 = cascade4.detectMultiScale(miniframe, scaleFactor=1.3, minNeighbors=12, minSize=(700, 950))


    for f in faces1:
        x, y, w, h = [ v for v in f ]
        cv2.rectangle(img, (x,y), (x+w,y+h), (255,255,255))
        sub_face1 = img[y:y+h, x:x+w]

    for f in faces2:
        x, y, w, h = [ v for v in f ]
        cv2.rectangle(img, (x,y), (x+w,y+h), (255,255,255))
        sub_face2 = img[y:y+h, x:x+w]

    for f in faces3:
        x, y, w, h = [ v for v in f ]
        cv2.rectangle(img, (x,y), (x+w,y+h), (255,255,255))
        sub_face3 = img[y:y+h, x:x+w]

    for f in faces4:
        x, y, w, h = [ v for v in f ]
        cv2.rectangle(img, (x,y), (x+w,y+h), (255,255,255))
        sub_face4 = img[y:y+h, x:x+w]


    if len(faces2) !=0:
        return sub_face2
    elif len(faces1) != 0:
        return sub_face1
    elif len(faces3) != 0:
        return sub_face3
    else:
        return sub_face4



@app.route('/')
async def homepage(request):
    html_file = path / 'view' / 'index.html'
    return HTMLResponse(html_file.open().read())


@app.route('/sitemap.xml')
async def sitemap(request):
    html_file = path / 'view' / 'sitemap.xml'
    return HTMLResponse(html_file.open().read())


@app.route('/what-is-body-fat-percentage.html')
async def sitemap(request):
    html_file = path / 'view' / 'what-is-body-fat-percentage.html'
    return HTMLResponse(html_file.open().read())


@app.route('/how-does-the-ai-body-fat-calculator-work.html')
async def sitemap(request):
    html_file = path / 'view' / 'how-does-the-ai-body-fat-calculator-work.html'
    return HTMLResponse(html_file.open().read())

@app.route('/what-factors-influence-your-body-weight.html')
async def sitemap(request):
    html_file = path / 'view' / 'what-factors-influence-your-body-weight.html'
    return HTMLResponse(html_file.open().read())

@app.route('/body-fat-percentages-of-men-and-women-with-pictures-and-charts.html')
async def sitemap(request):
    html_file = path / 'view' / 'body-fat-percentages-of-men-and-women-with-pictures-and-charts.html'
    return HTMLResponse(html_file.open().read())




@app.route('/how-to-lose-weight-fast-without-exercise.html')
async def sitemap(request):
    html_file = path / 'view' / 'how-to-lose-weight-fast-without-exercise.html'
    return HTMLResponse(html_file.open().read())


@app.route('/average-weight-loss-on-keto.html')
async def sitemap(request):
    html_file = path / 'view' / 'average-weight-loss-on-keto.html'
    return HTMLResponse(html_file.open().read())


@app.route('/how-to-resist-temptation-of-junk-food.html')
async def sitemap(request):
    html_file = path / 'view' / 'how-to-resist-temptation-of-junk-food.html'
    return HTMLResponse(html_file.open().read())


@app.route('/different-ways-to-measure-body-fat.html')
async def sitemap(request):
    html_file = path / 'view' / 'different-ways-to-measure-body-fat.html'
    return HTMLResponse(html_file.open().read())


@app.route('/free-weight-loss-resources.html')
async def sitemap(request):
    html_file = path / 'view' / 'free-weight-loss-resources.html'
    return HTMLResponse(html_file.open().read())

@app.route('/termsofuse.html')
async def sitemap(request):
    html_file = path / 'view' / 'termsofuse.html'
    return HTMLResponse(html_file.open().read())

@app.route('/privacy.html')
async def sitemap(request):
    html_file = path / 'view' / 'privacy.html'
    return HTMLResponse(html_file.open().read())


@app.route('/why-did-i-lose-weight-and-then-gain-it-back.html')
async def sitemap(request):
    html_file = path / 'view' / 'why-did-i-lose-weight-and-then-gain-it-back.html'
    return HTMLResponse(html_file.open().read())


@app.route('/weight-loss-jealousy.html')
async def sitemap(request):
    html_file = path / 'view' / 'weight-loss-jealousy.html'
    return HTMLResponse(html_file.open().read())

@app.route('/how-to-motivate-yourself-to-lose-weight.html')
async def sitemap(request):
    html_file = path / 'view' / 'how-to-motivate-yourself-to-lose-weight.html'
    return HTMLResponse(html_file.open().read())


# @app.route('/how-to-lose-weight-fast-and-easy.html')
# async def sitemap(request):
#     html_file = path / 'view' / 'how-to-lose-weight-fast-without-exercise.html'
#     return HTMLResponse(html_file.open().read())


async def app(scope, receive, send):
    assert scope['type'] == 'http'
    if scope['path'] != '/how-to-lose-weight-fast-and-easy.html':
        response = RedirectResponse(url='/how-to-lose-weight-fast-without-exercise.html')
    else:
        response = PlainTextResponse('Hello, world!')
    await response(scope, receive, send)


@app.route('/analyze', methods=['POST'])
async def analyze(request):
    img_data = await request.form()
    img_bytes = await (img_data['file'].read())
    img = Image.open(BytesIO(img_bytes))
    img = img.convert('RGB')


    basewidth = 2000
    f = str(path)
    image_file_name = "imageToSave.jpg"
    new_path = f + '/' + image_file_name
    wpercent = (basewidth/float(img.size[0]))
    hsize = int((float(img.size[1])*float(wpercent)))
    size =(basewidth, hsize)
    img = img.resize(size, Image.LANCZOS)
    img.save(new_path)


    main = await facecrop(new_path)
    success, encoded_image = cv2.imencode('.jpg', main)
    success_new = encoded_image.tobytes()
    img2 = open_image(BytesIO(success_new))
    prediction = learn.predict(img2)[0]
    return JSONResponse({'result': str(prediction)})


if __name__ == '__main__':
    if 'serve' in sys.argv:
        uvicorn.run(app=app, host='0.0.0.0', port=5000, log_level="info")
