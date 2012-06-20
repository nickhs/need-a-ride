from flask import Flask, request, jsonify, render_template
from xss import crossdomain
from flask.ext.sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test2.db'
db = SQLAlchemy(app)


class Rider(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80))

    def __init__(self, name):
        self.name = name

    def serialize(self):
        return {
            self.id: self.name
        }


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/data', methods=['POST', 'GET'])
@crossdomain(origin='*')
def data():
    if request.method == 'POST':
        name = request.form.keys()[0]
        r = Rider(name)
        db.session.add(r)
        db.session.commit()
        return jsonify(result='success')

    else:
        riders = Rider.query.all()
        ret = {}
        for rider in riders:
            ret.update(rider.serialize())

        return jsonify(ret)


@app.route('/delete/<name>')
@crossdomain(origin='*')
def delete(name):
    r = Rider.query.filter_by(name=name).first()
    if r is not None:
        db.session.delete(r)
        db.session.commit()

    return jsonify(result='success')


if __name__ == "__main__":
    app.run(debug=True)
