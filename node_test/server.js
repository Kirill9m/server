//ES Module import
import { sayHello } from './lib/hello.js'

const nameParam = process.argv[2];
sayHello(nameParam);