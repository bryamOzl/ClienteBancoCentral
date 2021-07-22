import { useState } from 'react';
import './App.css';

function App() {


  //CONSULTA SALDO
  const [numeroCuenta, setNumeroCuenta] = useState('');
  const [saldo, setSaldo] = useState({ cuentaId: 0, entidadFinanciera: '', fechaApertura: '', saldo: 0 });

  const [numeroCuentaD, setNumeroCuentaD] = useState('');
  const [saldoD, setSaldoD] = useState({ cuentaId: 0, entidadFinanciera: '', fechaApertura: '', saldo: 0 });

  const [message, setMessage] = useState('');


  //TRANSFERENCIA
  //const [cuentaOrigen, setCuentaOrigen] = useState('');
  //const [cuentaDestino, setCuentaDestino] = useState('');
  //const [monto, setMonto] = useState(0);
  const [cuentaOrigen, setCuentaOrigen] = useState('');
  const [respuestaO, setRespuestaO] = useState({ code: 0, message: '' });

  const [cuentaDestino, setCuentaDestino] = useState('');
  const [respuestaD, setRespuestaD] = useState({ code: 0, message: '' });

  const [monto, setMonto] = useState(0);

  const fetchData = () => {

    fetch('http://192.168.100.6:8088/buscarCuenta/' + numeroCuenta)
      .then(response => response.json())
      .then(data => { setSaldo(data) })
      .catch((error) => {
        console.log(error);
      });
  }

  const fetchDataD = () => {

    fetch('http://192.168.100.6:8088/buscarCuenta/' + numeroCuentaD)
      .then(response => response.json())
      .then(data => { setSaldoD(data) })
      .catch((error) => {
        console.log(error);
      });
  }

  const transferenciaBC = () => {

    fetch('http://192.168.100.6:8088/transferencia/' + monto + '/' + cuentaOrigen + '/' + cuentaDestino)
      .then(response => response.json())
      .then(data => { setMessage('La Transferencia se realizo con exito') })
      .catch((error) => {
        console.log(error);
      });
  }

  /* const enviarTransferencia = () => {
 
 
     let data = {
       monto: monto,
       cuentaOrigen: {
         cuentaId: 0,
         numeroCuenta: cuentaOrigen,
         saldo: 0
       },
       cuentaDestino: {
         cuentaId: 0,
         numeroCuenta: cuentaDestino,
         saldo: 0
       }
     }
 
 
     fetch('http://localhost:8080/pichincha/ws/movimientos/transferencia',
       {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)
       })
       .then(response => response.json())
       .then(data => { setMessage('La Transferencia se realizo con exito') })
       .catch((error) => {
         console.log(error);
       });
   }*/




  return (
    <div className="App">
      <br />
      <h3>TRANSFERENCIAS BANCO CENTRAL</h3>
      <h3>Consulta Cuenta Origen</h3>
      <label># Cuenta:</label>
      <input value={numeroCuenta} onChange={e => setNumeroCuenta(e.target.value)}></input>
      <button onClick={fetchData}>Consultar</button>
      <br />
      <label>Entidad financiera:</label>
      <label>{saldo.entidadFinanciera}</label>
      <br />
      <label>Saldo:</label>
      <label>{saldo.saldo}</label>
      <br />
      <label>Fecha Apertura:</label>
      <label>{saldo.fechaApertura}</label>

      <br />
      <h3>Consulta CUenta Destino</h3>
      <label># Cuenta:</label>
      <input value={numeroCuentaD} onChange={e => setNumeroCuentaD(e.target.value)}></input>
      <button onClick={fetchDataD}>Consultar</button>
      <br />
      <label>Entidad financiera:</label>
      <label>{saldoD.entidadFinanciera}</label>
      <br />
      <label>Saldo:</label>
      <label>{saldoD.saldo}</label>
      <br />
      <label>Fecha Apertura:</label>
      <label>{saldoD.fechaApertura}</label>

      <br />
      <br />
      <h3>Transferencia</h3>
      <label># Cuenta Origen:</label>
      <input value={cuentaOrigen} onChange={e => setCuentaOrigen(e.target.value)}></input>
      <br />
      <label># Cuenta Destino:</label>
      <input value={cuentaDestino} onChange={e => setCuentaDestino(e.target.value)}></input>
      <br />
      <label>Monto:</label>
      <input value={monto} onChange={e => setMonto(e.target.value)}></input>
      <br />


      <button onClick={transferenciaBC}>Transferir</button>
      <br />
      <label style={{ color: 'green' }}>{message}</label>

    </div>
  );
}

export default App;
