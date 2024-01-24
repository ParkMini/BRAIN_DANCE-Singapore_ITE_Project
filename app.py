from flask import Flask, render_template

app = Flask(__name__)

# 인덱스 페이지
@app.route('/')
def index():
    return render_template('index.html')

# 이미지 분류 페이지
@app.route('/image_classification')
def image_classification():
    return render_template('image_classification.html')

# 객체 감지 페이지
@app.route('/object_detection')
def object_detection():
    return render_template('object_detection.html')

# 포즈 감지 페이지
@app.route('/pose_detection')
def pose_detection():
    return render_template('pose_detection.html')

# AI 선택 페이지
@app.route('/selectAI')
def selectAI():
    return render_template('selectAI.html')

# 스타일 변경 페이지
@app.route('/style_change')
def style_change():
    return render_template('style_change.html')

@app.route('/cam-test')
def setAi():
    return render_template('camTest.html')

@app.route('/dance')
def dance():
    return render_template('choseDance.html')

@app.route('/music')
def music():
    return render_template('music.html')

@app.route('/ranking')
def ranking():
    return render_template('ranking.html')

@app.route('/badge')
def badge():
    return render_template('badge.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80, debug=True)
