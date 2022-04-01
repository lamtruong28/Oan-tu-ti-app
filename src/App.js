import { useEffect, useLayoutEffect, useState } from 'react';
import './App.css';
import Element from './Component/Element';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const eles = [
  {
    id: 0,
    value: <i className="fa fa-hand-peace-o" aria-hidden="true"></i>
  },
  {
    id: 1,
    value: <i className="fa fa-hand-rock-o" aria-hidden="true"></i>
  },
  {
    id: 2,
    value: <i className="fa fa-hand-paper-o" aria-hidden="true"></i>
  }
]

function App() {
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(undefined);
  const [robotSelected, setRobotSelected] = useState(undefined);
  const [hide, setHide] = useState(false);
  const [result, setResult] = useState();

  const handleSelect = (x, y) => {
    setHide(true);
    setLoading(false);
    setRobotSelected(x);
    setSelected(y);
  }
  useEffect(() => {
    if (selected != undefined)
      if (robotSelected === selected) {
        console.log('hoa')
        setResult('Hòa');
      } else {
        if ((robotSelected === 0 && selected === 1) ||
          (robotSelected === 1 && selected === 2) ||
          (robotSelected === 2 && selected === 0)) {
          console.log('thang')
          setResult("You win");
        } else {
          console.log('thua')
          setResult("You lose");
        }
      }
  }, [selected]);
  useEffect(() => {
    const notify = () => toast(result);
    notify();
  }, [result])
  const handleReset = () => {
    setLoading(true);
    setHide(false);
    setResult(undefined)
    setSelected(undefined);
  }
  return (
    <div className='app align-items-center d-flex'>
      <div className="container pt-3 text-center">
        <h1 className='text-primary'>Game Kéo Búa Bao</h1>
        <div className='row justify-content-center'>
          <h3>Máy</h3>
          {
            loading ? <Skeleton className='ele-children col-3' height={175} /> :
              <Element value={eles[robotSelected].value} />
          }
        </div>
        <h1 className='text-danger'>VS</h1>
        <div className='row justify-content-center'>
          <h3>You</h3>
          {
            hide ?
              <>
                <div>
                  <button className='btn btn-primary' onClick={handleReset}>
                    <i class="fa fa-refresh" aria-hidden="true"></i>
                  </button>
                </div>
                <Element value={eles[selected].value} />
              </>
              :
              eles.map((ele) => <Element key={ele.id} handleSelect={handleSelect} id={ele.id} value={ele.value} />)
          }
        </div>
      </div>
      <ToastContainer theme='dark' autoClose={2000} />
    </div >
  );
}

export default App;
