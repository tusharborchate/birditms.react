import {takeLatest,call,put} from 'redux-saga/effects'
import axios from 'axios';
const API_URL = 'http://localhost:5227/api/Users/register';

interface ILogin{

}
function* RegisterUser(data:any):any
{
  try   
  {
    console.log(data);
  const response= yield call(axios.post,API_URL,data.data);
  console.log(response);
  //yield put({ type: 'REGISTER_USER', payload: response.data });

  }

  catch(error)
  {
   // yield put({ type: 'REGISTER_USER', payload: error });


  }

}


function* rootSaga()
{

    yield takeLatest('REGISTER_USER',RegisterUser);
}

export default rootSaga;