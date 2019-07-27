import aiohttp
import asyncio
import uvicorn
import base64
from fastai import *
from fastai.vision import *
from io import BytesIO
from starlette.applications import Starlette
from starlette.middleware.cors import CORSMiddleware
from starlette.responses import HTMLResponse, JSONResponse
from starlette.staticfiles import StaticFiles

export_file_url = 'https://drive.google.com/uc?export=download&id=1TsuDVFNhNgP8ijd0xVQvcgeBlgS97u87'
export_file_name = 'export.pkl'

classes = ['female 8 to 11','female 13 to 15', 'female 16 to 18', 'female 19 to 20',
           'female 21 to 23',  'female 29 to 30', 'female 31 to 33',
          'female 35 to 39', 'female 40 plus', 'female 24 to 25', 'female 26 to 28',  'male 5 to 7', 'male 18 to 19', 'male 40 plus', 'male 5 to 7', 'male late 7ish to 9', 'male 10 to 12', 'male 13 to 15','male 16 to 17',
           'male 18 to 19', 'male 20 to 22', 'male 23 to 25', 'male 26 to 28','male 29 to 33','male 34 to 38',
            'male 40 plus']
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


@app.route('/')
async def homepage(request):
    html_file = path / 'view' / 'index.html'
    return HTMLResponse(html_file.open().read())


@app.route('/sitemap.xml')
async def sitemap(request):
    html_file = path / 'view' / 'sitemap.xml'
    return HTMLResponse(html_file.open().read())


@app.route('/analyze', methods=['POST'])
async def analyze(request):
    img_data = await request.form()
    img_bytes = await (img_data['file'].read())
    img = open_image(BytesIO(img_bytes))
    # img = base64.decodebytes(img_bytes.encode())
    prediction = learn.predict(img)[0]
    return JSONResponse({'result': str(prediction)})


if __name__ == '__main__':
    if 'serve' in sys.argv:
        uvicorn.run(app=app, host='0.0.0.0', port=5000, log_level="info")
