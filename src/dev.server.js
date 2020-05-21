import app, { mainHandler } from './server'

app.get('/*', mainHandler)

app.listen(3000)