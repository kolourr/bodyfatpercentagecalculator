"""
This application was built based on Jeremy Howard's Bear Classifier Webapp. It uses the Fast AI Library, Intel's Haarcascades and Croppie JS plugin

"""


import aiohttp
import asyncio
import uvicorn
import base64
import math
import cv2
import requests
import numpy as np
import os
from fastai import *
from fastai.vision import *
from io import BytesIO
from starlette.applications import Starlette
from starlette.middleware.cors import CORSMiddleware
from starlette.responses import HTMLResponse, JSONResponse, PlainTextResponse, RedirectResponse
from starlette.staticfiles import StaticFiles
from starlette.requests import Request
from PIL import Image



export_file_url = 'https://drive.google.com/uc?export=download&id=1qqwWp_QIb2BkHqLKlccBNrdW2kJz9zIB'
export_file_name = 'export.pkl'

classes = ['5 to 7', '7.5 to 9', '8 to 11', '10 to 12', '13 to 15', '13 to 15.5', '16 to 17', '16 to 18', '18 to 19', '19 to 20', '20 to 22', '21 to 23', '23 to 25', '24 to 25', '26 to 28', '26 to 28.5', '29 to 30', '29 to 33', '31 to 33', '34 to 38', '35 to 39', '40 plus', '40+']






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


@app.route('/how-to-lose-weight-fast-and-easy.html')
async def sitemap(request):
    return RedirectResponse(url='https://www.estimatebodyfat.com/how-to-lose-weight-fast-without-exercise.html')

@app.route('/how-to-lose-face-fat.html')
async def sitemap(request):
    html_file = path / 'view' / 'how-to-lose-face-fat.html'
    return HTMLResponse(html_file.open().read())

@app.route('/psychological-blocks-to-weight-loss.html')
async def sitemap(request):
    html_file = path / 'view' / 'psychological-blocks-to-weight-loss.html'
    return HTMLResponse(html_file.open().read())


@app.route('/ways-to-lower-body-fat-percentage.html')
async def sitemap(request):
    html_file = path / 'view' / 'ways-to-lower-body-fat-percentage.html'
    return HTMLResponse(html_file.open().read())


@app.route('/body-fat-calculator.html')
async def sitemap(request):
    html_file = path / 'view' / 'body-fat-calculator.html'
    return HTMLResponse(html_file.open().read())

@app.route('/caliper-calculator.html')
async def sitemap(request):
    html_file = path / 'view' / 'caliper-calculator.html'
    return HTMLResponse(html_file.open().read())


@app.route('/face-fat.html')
async def sitemap(request):
    html_file = path / 'view' / 'face-fat.html'
    return HTMLResponse(html_file.open().read())


@app.route('/body-goal-project.html')
async def sitemap(request):
    html_file = path / 'view' / 'body-goal-project.html'
    return HTMLResponse(html_file.open().read())

@app.route('/motivational-quote-email.html')
async def sitemap(request):
    return RedirectResponse(url='https://www.estimatebodyfat.com/body-goal-project.html')

@app.route('/ai-calculator.html')
async def sitemap(request):
    html_file = path / 'view' / 'ai-calculator.html'
    return HTMLResponse(html_file.open().read())

@app.route('/ketoebook.html')
async def sitemap(request):
    html_file = path / 'view' / 'ketoebook.html'
    return HTMLResponse(html_file.open().read())

@app.route('/success.html')
async def sitemap(request):
    html_file = path / 'view' / 'success.html'
    return HTMLResponse(html_file.open().read())

@app.route('/cancel.html')
async def sitemap(request):
    html_file = path / 'view' / 'cancel.html'
    return HTMLResponse(html_file.open().read())


@app.route('/coronavirus-weight-risk-calculator.html')
async def sitemap(request):
    html_file = path / 'view' / 'coronavirus-weight-risk-calculator.html'
    return HTMLResponse(html_file.open().read())


@app.route('/ketoebook.html')
async def sitemap(request):
    return RedirectResponse(url='https://www.estimatebodyfat.com/')

@app.route('/cancel.html')
async def sitemap(request):
    return RedirectResponse(url='https://www.estimatebodyfat.com/')


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




@app.route('/jp3python', methods=['POST'])
async def jp3python(request):
    form = await request.form()
    gender = int(form['gender'])
    age =  float(form['age'])
    weight_choice =  float(form['weight_choice'])
    weight =  float(form['weight'])
    height_choice =  float(form['height_choice'])
    height =  float(form['height'])
    pectoral =  float(form['pectoral'])
    abdomen_men =  float(form['abdomen_men'])
    quadricep_men =  float(form['quadricep_men'])
    women_tricep =  float(form['women_tricep'])
    quadricep_women =  float(form['quadricep_women'])
    suprailiac =  float(form['suprailiac'])

    if height_choice == 177:
        inches, feet  = math.modf(height)
        new_height = 12.0 * feet + inches
    elif height_choice == 188:
        new_height = height

    bm_men =  1.1093800 - 0.0008267 * (pectoral +abdomen_men+quadricep_men) + 0.0000016 * (pectoral +abdomen_men+quadricep_men)**2 - (0.0002574 * age)

    bm_women = 1.0994921 - 0.0009929 * (women_tricep +quadricep_women+suprailiac) + 0.0000023 * (women_tricep +quadricep_women+suprailiac)**2- (0.0001392 * age)

    bfpm= 495/bm_men - 450
    fbmm = weight * bfpm/100
    lbmm = weight - fbmm

    bfpf =  495/bm_women - 450
    fbmf =  weight * bfpf/100
    lbmf =  weight - fbmf

    if weight_choice == 118:
        bmi = 703 * (weight/new_height**2)
        weightunit = 'pounds'
    elif weight_choice == 117:
        bmi =  weight/(new_height/100)**2
        weightunit = 'kgs'


    if bmi < 18.50:
        bmi_category = 'UNDERWEIGHT'
    elif bmi >= 18.50 and bmi <= 24.9:
        bmi_category = 'NORMAL'
    elif bmi >= 25.0 and bmi <= 29.9:
        bmi_category = 'OVERWEIGHT'
    else:
        bmi_category = 'OBESE'

    if gender == 15:
        return JSONResponse({'answer': round(bfpm, 2), 'fatmass': round(fbmm, 2), 'leanmass': round(lbmm, 2), 'bmi': round(bmi, 1), 'bmi-category': str(bmi_category), 'weightunit': str(weightunit)})

    else:
        return JSONResponse({'answer': round(bfpf, 2), 'fatmass': round(fbmf, 2), 'leanmass': round(lbmf, 2), 'bmi': round(bmi, 1), 'bmi-category': str(bmi_category), 'weightunit': str(weightunit)})




@app.route('/jp4python', methods=['POST'])
async def jp4python(request):
    form = await request.form()
    print(form)
    gender = int(form['gender'])
    age =  float(form['age'])
    weight_choice =  float(form['weight_choice'])
    weight =  float(form['weight'])
    height_choice =  float(form['height_choice'])
    height =  float(form['height'])
    abdomen =  float(form['abdomen'])
    tricep =  float(form['tricep'])
    quadricep =  float(form['quadricep'])
    suprailiac =  float(form['suprailiac'])


    if height_choice == 1177:
        inches, feet  = math.modf(height)
        new_height = 12.0 * feet + inches
    elif height_choice == 1188:
        new_height = height


    bfpm= 0.29288 * (abdomen+tricep+quadricep+suprailiac) - 0.0005 * (abdomen+tricep+quadricep+suprailiac)**2 + 0.15845 * age - 5.76377
    fbmm = weight * bfpm/100
    lbmm = weight - fbmm

    bfpf =  0.29669 * (abdomen+tricep+quadricep+suprailiac) - 0.00043 * (abdomen+tricep+quadricep+suprailiac)**2 + 0.02963 * age + 1.4072
    fbmf =  weight * bfpf/100
    lbmf =  weight - fbmf

    if weight_choice == 1118:
        bmi = 703 * (weight/new_height**2)
        weightunit = 'pounds'
    elif weight_choice == 1117:
        bmi =  weight/(new_height/100)**2
        weightunit = 'kgs'


    if bmi < 18.50:
        bmi_category = 'UNDERWEIGHT'
    elif bmi >= 18.50 and bmi <= 24.9:
        bmi_category = 'NORMAL'
    elif bmi >= 25.0 and bmi <= 29.9:
        bmi_category = 'OVERWEIGHT'
    else:
        bmi_category = 'OBESE'

    if gender == 55:
        return JSONResponse({'answer': round(bfpm, 2), 'fatmass': round(fbmm, 2), 'leanmass': round(lbmm, 2), 'bmi': round(bmi, 1), 'bmi-category': str(bmi_category), 'weightunit': str(weightunit)})

    else:
        return JSONResponse({'answer': round(bfpf, 2), 'fatmass': round(fbmf, 2), 'leanmass': round(lbmf, 2), 'bmi': round(bmi, 1), 'bmi-category': str(bmi_category), 'weightunit': str(weightunit)})

@app.route('/jp7python', methods=['POST'])
async def jp7python(request):
    form = await request.form()
    gender = int(form['gender'])
    age =  float(form['age'])
    weight_choice =  float(form['weight_choice'])
    weight =  float(form['weight'])
    height_choice =  float(form['height_choice'])
    height =  float(form['height'])
    pectoral =  float(form['pectoral'])
    midaxilla =  float(form['midaxilla'])
    tricep =  float(form['tricep'])
    subscapular =  float(form['subscapular'])
    abdomen =  float(form['abdomen'])
    suprailiac =  float(form['suprailiac'])
    quadricep =  float(form['quadricep'])

    if height_choice == 1091:
        inches, feet  = math.modf(height)
        new_height = 12.0 * feet + inches
    elif height_choice == 1092:
        new_height = height

    bm_men =  1.112 - 0.00043499  * (pectoral +midaxilla+tricep+subscapular+abdomen+suprailiac+quadricep) + 0.00000055  * (pectoral +midaxilla+tricep+subscapular+abdomen+suprailiac+quadricep)**2 - (0.00028826  * age)

    bm_women = 1.097  - 0.00046971  * (pectoral +midaxilla+tricep+subscapular+abdomen+suprailiac+quadricep) + 0.00000056  * (pectoral +midaxilla+tricep+subscapular+abdomen+suprailiac+quadricep)**2- (0.00012828  * age)

    bfpm= 495/bm_men - 450
    fbmm = weight * bfpm/100
    lbmm = weight - fbmm

    bfpf =  495/bm_women - 450
    fbmf =  weight * bfpf/100
    lbmf =  weight - fbmf

    if weight_choice == 1018:
        bmi = 703 * (weight/new_height**2)
        weightunit = 'pounds'
    elif weight_choice == 1017:
        bmi =  weight/(new_height/100)**2
        weightunit = 'kgs'


    if bmi < 18.50:
        bmi_category = 'UNDERWEIGHT'
    elif bmi >= 18.50 and bmi <= 24.9:
        bmi_category = 'NORMAL'
    elif bmi >= 25.0 and bmi <= 29.9:
        bmi_category = 'OVERWEIGHT'
    else:
        bmi_category = 'OBESE'

    if gender == 1555:
        return JSONResponse({'answer': round(bfpm, 2), 'fatmass': round(fbmm, 2), 'leanmass': round(lbmm, 2), 'bmi': round(bmi, 1), 'bmi-category': str(bmi_category), 'weightunit': str(weightunit)})

    else:
        return JSONResponse({'answer': round(bfpf, 2), 'fatmass': round(fbmf, 2), 'leanmass': round(lbmf, 2), 'bmi': round(bmi, 1), 'bmi-category': str(bmi_category), 'weightunit': str(weightunit)})



@app.route('/p9python', methods=['POST'])
async def p9python(request):
    form = await request.form()
    gender = int(form['gender'])
    age =  float(form['age'])
    weight_choice =  float(form['weight_choice'])
    weight =  float(form['weight'])
    height_choice =  float(form['height_choice'])
    height =  float(form['height'])
    pectoral =  float(form['pectoral'])
    abdomen =  float(form['abdomen'])
    quadricep =  float(form['quadricep'])
    bicep =  float(form['bicep'])
    tricep =  float(form['tricep'])
    subscapular =  float(form['subscapular'])
    suprailiac =  float(form['suprailiac'])
    lowerback =  float(form['lowerback'])
    calf =  float(form['calf'])

    if height_choice == 109100:
        inches, feet  = math.modf(height)
        new_height = 12.0 * feet + inches
    elif height_choice == 109200:
        new_height = height

    if weight_choice == 18000:
        bmi = 703 * (weight/new_height**2)
        weightunit = 'pounds'
        bfpm =  (pectoral+abdomen+quadricep+bicep+tricep+subscapular+suprailiac+lowerback+calf) * 27 /weight
    elif weight_choice == 17000:
        bmi =  weight/(new_height/100)**2
        weightunit = 'kgs'
        bfpm =  (pectoral+abdomen+quadricep+bicep+tricep+subscapular+suprailiac+lowerback+calf) * 27 /(weight*2.20462)

    fbmm = weight * bfpm/100
    lbmm = weight - fbmm

    fbmf =  weight * bfpm/100
    lbmf =  weight - fbmf

    if bmi < 18.50:
        bmi_category = 'UNDERWEIGHT'
    elif bmi >= 18.50 and bmi <= 24.9:
        bmi_category = 'NORMAL'
    elif bmi >= 25.0 and bmi <= 29.9:
        bmi_category = 'OVERWEIGHT'
    else:
        bmi_category = 'OBESE'

    if gender == 15000:
        return JSONResponse({'answer': round(bfpm, 2), 'fatmass': round(fbmm, 2), 'leanmass': round(lbmm, 2), 'bmi': round(bmi, 1), 'bmi-category': str(bmi_category), 'weightunit': str(weightunit)})

    else:
        return JSONResponse({'answer': round(bfpm, 2), 'fatmass': round(fbmf, 2), 'leanmass': round(lbmf, 2), 'bmi': round(bmi, 1), 'bmi-category': str(bmi_category), 'weightunit': str(weightunit)})


@app.route('/dw4python', methods=['POST'])
async def dw4python(request):
    form = await request.form()
    gender = int(form['gender'])
    age =  float(form['age'])
    weight_choice =  float(form['weight_choice'])
    weight =  float(form['weight'])
    height_choice =  float(form['height_choice'])
    height =  float(form['height'])
    tricep =  float(form['tricep'])
    bicep =  float(form['bicep'])
    subscapular =  float(form['subscapular'])
    suprailiac =  float(form['suprailiac'])


    if height_choice == 10539100:
        inches, feet  = math.modf(height)
        new_height = 12.0 * feet + inches
    elif height_choice == 102239200:
        new_height = height

    if age < 16.9:
        bm_men = 1.1533 - 0.0643 * math.log10(tricep+bicep+subscapular+suprailiac)
        bfpm= 495/bm_men - 450
        fbmm = weight * bfpm/100
        lbmm = weight - fbmm

        bm_women =1.1369 - 0.0598 * math.log10(tricep+bicep+subscapular+suprailiac)
        bfpf =  495/bm_women - 450
        fbmf =  weight * bfpf/100
        lbmf =  weight - fbmf

    elif age >= 17 and age<= 19.9:

        bm_men = 1.1620 - 0.0630 * math.log10(tricep+bicep+subscapular+suprailiac)
        bfpm= 495/bm_men - 450
        fbmm = weight * bfpm/100
        lbmm = weight - fbmm

        bm_women =1.1549 - 0.0678 * math.log10(tricep+bicep+subscapular+suprailiac)
        bfpf =  495/bm_women - 450
        fbmf =  weight * bfpf/100
        lbmf =  weight - fbmf

    elif age >= 20 and age<= 29.9:

        bm_men = 1.1631 - 0.0632 * math.log10(tricep+bicep+subscapular+suprailiac)
        bfpm= 495/bm_men - 450
        fbmm = weight * bfpm/100
        lbmm = weight - fbmm

        bm_women =1.1599 - 0.0717 * math.log10(tricep+bicep+subscapular+suprailiac)
        bfpf =  495/bm_women - 450
        fbmf =  weight * bfpf/100
        lbmf =  weight - fbmf

    elif age >= 30 and age<= 39.9:

        bm_men = 1.1422 - 0.0544 * math.log10(tricep+bicep+subscapular+suprailiac)
        bfpm= 495/bm_men - 450
        fbmm = weight * bfpm/100
        lbmm = weight - fbmm

        bm_women =1.1423 - 0.0632 * math.log10(tricep+bicep+subscapular+suprailiac)
        bfpf =  495/bm_women - 450
        fbmf =  weight * bfpf/100
        lbmf =  weight - fbmf

    elif age >= 40 and age<= 49.9:

        bm_men = 1.1620 - 0.0700 * math.log10(tricep+bicep+subscapular+suprailiac)
        bfpm= 495/bm_men - 450
        fbmm = weight * bfpm/100
        lbmm = weight - fbmm

        bm_women =1.1333 - 0.0612 * math.log10(tricep+bicep+subscapular+suprailiac)
        bfpf =  495/bm_women - 450
        fbmf =  weight * bfpf/100
        lbmf =  weight - fbmf

    else:

        bm_men = 1.1715 - 0.0779 * math.log10(tricep+bicep+subscapular+suprailiac)
        bfpm= 495/bm_men - 450
        fbmm = weight * bfpm/100
        lbmm = weight - fbmm

        bm_women =1.1339 - 0.0645 * math.log10(tricep+bicep+subscapular+suprailiac)
        bfpf =  495/bm_women - 450
        fbmf =  weight * bfpf/100
        lbmf =  weight - fbmf



    if weight_choice == 180000:
        bmi = 703 * (weight/new_height**2)
        weightunit = 'pounds'
    elif weight_choice == 170000:
        bmi =  weight/(new_height/100)**2
        weightunit = 'kgs'


    if bmi < 18.50:
        bmi_category = 'UNDERWEIGHT'
    elif bmi >= 18.50 and bmi <= 24.9:
        bmi_category = 'NORMAL'
    elif bmi >= 25.0 and bmi <= 29.9:
        bmi_category = 'OVERWEIGHT'
    else:
        bmi_category = 'OBESE'

    if gender == 150000:
        return JSONResponse({'answer': round(bfpm, 2), 'fatmass': round(fbmm, 2), 'leanmass': round(lbmm, 2), 'bmi': round(bmi, 1), 'bmi-category': str(bmi_category), 'weightunit': str(weightunit)})

    else:
        return JSONResponse({'answer': round(bfpf, 2), 'fatmass': round(fbmf, 2), 'leanmass': round(lbmf, 2), 'bmi': round(bmi, 1), 'bmi-category': str(bmi_category), 'weightunit': str(weightunit)})




@app.route('/usunitnavy', methods=['POST'])
async def usunitnavy(request):
    form = await request.form()
    gender = int(form['gender'])
    age =  float(form['age'])
    weight =  float(form['weight'])
    height_feet =  float(form['height_feet'])
    height_inches =  float(form['height_inches'])
    neck_feet =  float(form['neck_feet'])
    neck_inches =  float(form['neck_inches'])
    waist_feet =  float(form['waist_feet'])
    waist_inches =  float(form['waist_inches'])
    hip_feet =  float(form['hip_feet'])
    hip_inches =  float(form['hip_inches'])

    height = height_feet * 12 + height_inches
    neck = neck_feet * 12 + neck_inches
    waist = waist_feet * 12 + waist_inches
    hip = hip_feet * 12 + hip_inches


    bfpm= 86.010 * math.log10(waist-neck) - 70.041 * math.log10(height) + 36.76
    fbmm = weight * bfpm/100
    lbmm = weight - fbmm

    bfpf = 163.205 * math.log10(waist+hip-neck) - 97.684 * math.log10(height) - 78.387
    fbmf =  weight * bfpf/100
    lbmf =  weight - fbmf

    bmi = 703 * (weight/height**2)

    if bmi < 18.50:
        bmi_category = 'UNDERWEIGHT'
    elif bmi >= 18.50 and bmi <= 24.9:
        bmi_category = 'NORMAL'
    elif bmi >= 25.0 and bmi <= 29.9:
        bmi_category = 'OVERWEIGHT'
    else:
        bmi_category = 'OBESE'

    if age <= 20.9:
        army_men_bf = 26.0
        army_women_bf = 32.0
        army_ideal_men_bf = 20.0
        army_ideal_women_bf = 30.0
    elif age >= 21 and age <=27.9:
        army_men_bf = 26.0
        army_women_bf = 32.0
        army_ideal_men_bf = 22.0
        army_ideal_women_bf = 32.0
    elif age >= 28 and age <=39.9:
        army_men_bf = 28.0
        army_women_bf = 34.0
        army_ideal_men_bf = 24.0
        army_ideal_women_bf = 34.0
    else:
        army_men_bf = 30.0
        army_women_bf = 36.0
        army_ideal_men_bf = 26.0
        army_ideal_women_bf = 36.0



    if age <= 20.9:
        marine_men_bf = 18.0
        marine_women_bf = 26.0
    elif age >= 21 and age <=25.9:
        marine_men_bf = 18.0
        marine_women_bf = 26.0
    elif age >= 26 and age <=30.9:
        marine_men_bf = 19.0
        marine_women_bf = 27.0
    elif age >= 31 and age <=35.9:
        marine_men_bf = 19.0
        marine_women_bf = 27.0
    elif age >= 36 and age <=40.9:
        marine_men_bf = 20.0
        marine_women_bf = 28.0
    elif age >= 41 and age <=45.9:
        marine_men_bf = 20.0
        marine_women_bf = 28.0
    elif age >= 46 and age <=50.9:
        marine_men_bf = 21.0
        marine_women_bf = 29.0
    else:
        marine_men_bf = 21.0
        marine_women_bf = 29.0

    if age <= 21.9:
        navy_men_bf = 22.0
        navy_women_bf = 33.0
    elif age >= 22 and age <=29.9:
        navy_men_bf = 23.0
        navy_women_bf = 34.0
    elif age >= 30 and age <=39.9:
        navy_men_bf = 24.0
        navy_women_bf = 35.0
    else:
        navy_men_bf = 26.0
        navy_women_bf = 36.0



    if gender == 1:

        initial_army = bfpm - army_men_bf
        post_army = bfpm - army_ideal_men_bf

        if initial_army <= 0:
            iarmy = 0
            army_note = 'YES'
        else:
            iarmy = initial_army
            army_note = 'NO'

        if post_army <= 0:
            parmy = 0
        else:
            parmy = post_army

        initial_marine = bfpm - marine_men_bf

        if initial_marine <= 0:
            imarine = 0
            marine_note = 'YES'
        else:
            imarine = initial_marine
            marine_note = 'NO'

        initial_navy = bfpm - navy_men_bf

        if initial_marine <= 0:
            inavy = 0
            navy_note = 'YES'
        else:
            inavy = initial_navy
            navy_note = 'NO'


        return JSONResponse({'answer': round(bfpm, 2), 'fatmass': round(fbmm, 2), 'leanmass': round(lbmm, 2), 'bmi': round(bmi, 1), 'bmi-category': str(bmi_category), 'army-note': str(army_note),'army-standard-answer': round(iarmy,1), 'army-post-answer': round(parmy,1), 'marine-note': str(marine_note),'marine-standard-answer': round(imarine,1),'navy-note': str(navy_note),'navy-standard-answer': round(inavy,1)})

    else:

        initial_army = bfpf - army_women_bf
        post_army = bfpf - army_ideal_women_bf

        if initial_army <= 0:
            iarmy = 0
            army_note = 'YES'
        else:
            iarmy = initial_army
            army_note = 'NO'

        if post_army <= 0:
            parmy = 0
        else:
            parmy = post_army

        initial_marine = bfpf - marine_women_bf

        if initial_marine <= 0:
            imarine = 0
            marine_note = 'YES'
        else:
            imarine = initial_marine
            marine_note = 'NO'


        initial_navy = bfpf - navy_women_bf

        if initial_navy <= 0:
            inavy = 0
            navy_note = 'YES'
        else:
            inavy = initial_navy
            navy_note = 'NO'


        return JSONResponse({'answer': round(bfpf, 2), 'fatmass': round(fbmf, 2), 'leanmass': round(lbmf, 2), 'bmi': round(bmi, 1), 'bmi-category': str(bmi_category), 'army-note': str(army_note),'army-standard-answer': round(iarmy,1), 'army-post-answer': round(parmy,1), 'marine-note': str(marine_note),'marine-standard-answer': round(imarine,1),'navy-note': str(navy_note),'navy-standard-answer': round(inavy,1)})



@app.route('/metricunitnavy', methods=['POST'])
async def usunitnavy(request):
    form = await request.form()
    gender = int(form['gender'])
    age =  float(form['age'])
    weight =  float(form['weight'])
    height =  float(form['height'])
    neck =  float(form['neck'])
    waist =  float(form['waist'])
    hip =  float(form['hip'])



    bfpm= 495/(1.0324 - 0.19077*math.log10(waist-neck) +0.15456 * math.log10(height)) - 450
    fbmm = weight * bfpm/100
    lbmm = weight - fbmm

    bfpf = 495/(1.29579 - 0.35004*math.log10(waist+hip-neck) +0.22100 * math.log10(height)) - 450
    fbmf =  weight * bfpf/100
    lbmf =  weight - fbmf

    bmi = weight/(height/100)**2


    if bmi < 18.50:
        bmi_category = 'UNDERWEIGHT'
    elif bmi >= 18.50 and bmi <= 24.9:
        bmi_category = 'NORMAL'
    elif bmi >= 25.0 and bmi <= 29.9:
        bmi_category = 'OVERWEIGHT'
    else:
        bmi_category = 'OBESE'


    if age <= 20.9:
        army_men_bf = 26.0
        army_women_bf = 32.0
        army_ideal_men_bf = 20.0
        army_ideal_women_bf = 30.0
    elif age >= 21 and age <=27.9:
        army_men_bf = 26.0
        army_women_bf = 32.0
        army_ideal_men_bf = 22.0
        army_ideal_women_bf = 32.0
    elif age >= 28 and age <=39.9:
        army_men_bf = 28.0
        army_women_bf = 34.0
        army_ideal_men_bf = 24.0
        army_ideal_women_bf = 34.0
    else:
        army_men_bf = 30.0
        army_women_bf = 36.0
        army_ideal_men_bf = 26.0
        army_ideal_women_bf = 36.0


    if age <= 20.9:
        marine_men_bf = 18.0
        marine_women_bf = 26.0
    elif age >= 21 and age <=25.9:
        marine_men_bf = 18.0
        marine_women_bf = 26.0
    elif age >= 26 and age <=30.9:
        marine_men_bf = 19.0
        marine_women_bf = 27.0
    elif age >= 31 and age <=35.9:
        marine_men_bf = 19.0
        marine_women_bf = 27.0
    elif age >= 36 and age <=40.9:
        marine_men_bf = 20.0
        marine_women_bf = 28.0
    elif age >= 41 and age <=45.9:
        marine_men_bf = 20.0
        marine_women_bf = 28.0
    elif age >= 46 and age <=50.9:
        marine_men_bf = 21.0
        marine_women_bf = 29.0
    else:
        marine_men_bf = 21.0
        marine_women_bf = 29.0

    if age <= 21.9:
        navy_men_bf = 22.0
        navy_women_bf = 33.0
    elif age >= 22 and age <=29.9:
        navy_men_bf = 23.0
        navy_women_bf = 34.0
    elif age >= 30 and age <=39.9:
        navy_men_bf = 24.0
        navy_women_bf = 35.0
    else:
        navy_men_bf = 26.0
        navy_women_bf = 36.0


    if gender == 3:

        initial_army = bfpm - army_men_bf
        post_army = bfpm - army_ideal_men_bf

        if initial_army <= 0:
            iarmy = 0
            army_note = 'YES'
        else:
            iarmy = initial_army
            army_note = 'NO'

        if post_army <= 0:
            parmy = 0
        else:
            parmy = post_army



        initial_marine = bfpm - marine_men_bf

        if initial_marine <= 0:
            imarine = 0
            marine_note = 'YES'
        else:
            imarine = initial_marine
            marine_note = 'NO'


        initial_navy = bfpm - navy_men_bf

        if initial_marine <= 0:
            inavy = 0
            navy_note = 'YES'
        else:
            inavy = initial_navy
            navy_note = 'NO'


        return JSONResponse({'answer': round(bfpm, 2), 'fatmass': round(fbmm, 2), 'leanmass': round(lbmm, 2), 'bmi': round(bmi, 1), 'bmi-category': str(bmi_category), 'army-note': str(army_note),'army-standard-answer': round(iarmy,1), 'army-post-answer': round(parmy,1), 'marine-note': str(marine_note),'marine-standard-answer': round(imarine,1),'navy-note': str(navy_note),'navy-standard-answer': round(inavy,1)})


    else:

        initial_army = bfpf - army_women_bf
        post_army = bfpf - army_ideal_women_bf

        if initial_army <= 0:
            iarmy = 0
            army_note = 'YES'
        else:
            iarmy = initial_army
            army_note = 'NO'

        if post_army <= 0:
            parmy = 0
        else:
            parmy = post_army


        initial_marine = bfpf - marine_women_bf

        if initial_marine <= 0:
            imarine = 0
            marine_note = 'YES'
        else:
            imarine = initial_marine
            marine_note = 'NO'



        initial_navy = bfpf - navy_women_bf

        if initial_navy <= 0:
            inavy = 0
            navy_note = 'YES'
        else:
            inavy = initial_navy
            navy_note = 'NO'


        return JSONResponse({'answer': round(bfpf, 2), 'fatmass': round(fbmf, 2), 'leanmass': round(lbmf, 2), 'bmi': round(bmi, 1), 'bmi-category': str(bmi_category), 'army-note': str(army_note),'army-standard-answer': round(iarmy,1), 'army-post-answer': round(parmy,1), 'marine-note': str(marine_note),'marine-standard-answer': round(imarine,1),'navy-note': str(navy_note),'navy-standard-answer': round(inavy,1)})













export_file_url_face = 'https://drive.google.com/uc?export=download&id=1UXqh5B0WtqwCbZMmYTeBY74uzWgasy4z'
export_file_name_face = 'face_export.pkl'

classes_face = ['5 to 7', '10 to 12', '13 to 15', '16 to 17.5', '18 to 19', '20 to 22', '23 to 25', '26 to 28','29 to 33', '34 to 38', '40plus', '7.5 to 9', '8 to 11','13.5 to 15', '16 to 18', '21 to 23', '26.5 to 28', '19 to 20','40+','35 to 39', '29 to 30', '31 to 33' ]



async def setup_learner_face():
    await download_file(export_file_url_face, path / export_file_name_face)
    try:
        learn = load_learner(path, export_file_name_face)
        return learn
    except RuntimeError as e:
        if len(e.args) > 0 and 'CPU-only machine' in e.args[0]:
            print(e)
            message = "\n\nThis model was trained with an old version of fastai and will not work in a CPU environment.\n\nPlease update the fastai library in your training environment and export your model again.\n\nSee instructions for 'Returning to work' at https://course.fast.ai."
            raise RuntimeError(message)
        else:
            raise


loop_face = asyncio.set_event_loop(asyncio.new_event_loop())
loop_face1 = asyncio.get_event_loop()
tasks_face = [asyncio.ensure_future(setup_learner_face())]
learn_face = loop_face1.run_until_complete(asyncio.gather(*tasks_face))[0]
loop_face1.close()


async def realfacecrop(image):


    global sub_face9
    women_file_name = 'face.xml'
    women_url = 'https://drive.google.com/uc?export=download&id=1Vmq6hUfnP6DXwg6YDNPNC8T7YP0hnSMs'
    await download_file(women_url, path / women_file_name)
    f = str(path)

    cascade1 = cv2.CascadeClassifier(f + '/' + women_file_name)

    img = cv2.imread(image)
    minisize = (img.shape[1],img.shape[0])
    miniframe = cv2.resize(img, minisize)


    faces1 = cascade1.detectMultiScale(miniframe, scaleFactor=1.3, minNeighbors=12, minSize=(700, 950))


    for f in faces1:
        x, y, w, h = [ v for v in f ]
        cv2.rectangle(img, (x,y), (x+w,y+h), (0,255,0))
        sub_face9 = img[y:y+h, x:x+w]


    if len(faces1) !=0:
        return sub_face9
    else:
        return img






@app.route('/faceanalyze', methods=['POST'])
async def faceanalyze(request):
    img_data = await request.form()
    img_bytes = await (img_data['file'].read())
    img = Image.open(BytesIO(img_bytes))
    img = img.convert('RGB')


    basewidth = 1000
    f = str(path)
    image_file_name = "imageToSave2.jpg"
    new_path = f + '/' + image_file_name
    wpercent = (basewidth/float(img.size[0]))
    hsize = int((float(img.size[1])*float(wpercent)))
    size =(basewidth, hsize)
    img = img.resize(size, Image.LANCZOS)
    img.save(new_path)


    main = await realfacecrop(new_path)
    success, encoded_image = cv2.imencode('.jpg', main)
    success_new = encoded_image.tobytes()
    img2 = open_image(BytesIO(success_new))
    prediction = learn_face.predict(img2)[0]
    return JSONResponse({'result': str(prediction)})




if __name__ == '__main__':
    if 'serve' in sys.argv:
        uvicorn.run(app=app, host='0.0.0.0', port=5000, log_level="info")
