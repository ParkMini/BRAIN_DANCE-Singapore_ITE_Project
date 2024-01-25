from flask import Flask, render_template

app = Flask(__name__)

# 인덱스 페이지
@app.route('/')
def index():
    return render_template('index.html')

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

@app.route('/result')
def result():
    return render_template('result.html')

@app.route('/admin')
def admin():
    return render_template('admin.html')

@app.route('/addMusic')
def addMusic():
    return render_template('addMusic.html')

@app.route('/play-music')
def playMusic():
    return render_template('playMusic.html')

@app.route('/exam-result')
def examResult():
    return render_template('examResult.html')



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80, debug=True)
