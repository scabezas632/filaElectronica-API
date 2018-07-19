//========================================
// Puerto 
//========================================
process.env.PORT = process.env.PORT || 3000;

//========================================
// Entorno 
//========================================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//========================================
// Base de Datos 
//========================================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/filaElectronicaDB'
} else {
    urlDB = 'mongodb://admin:Samuel987456@ds141661.mlab.com:41661/fila_electronica'
}

process.env.URLDB = urlDB;