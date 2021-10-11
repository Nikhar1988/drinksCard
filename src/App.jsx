import { useEffect } from 'react';
import 'antd/dist/antd.css';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDrinks } from './store/reducer';
import CardComponent from './component/CardComponent';
import { FilterLike } from './component/FilterLike';
 
 
const App= () => {
  const {drinkList, error, status, showLikesDrinkStatus, likeDrinkList} = useSelector(state => state.drinks);
  
  const dispatch = useDispatch(); 
  
  useEffect(() => {
    dispatch(fetchDrinks());
  }, []) 

  const whatDrinkListShow = showLikesDrinkStatus ? likeDrinkList  : drinkList;
 
  return (
    <div className='app' >
      <div className='button-style'>
        <FilterLike showLikesDrinkStatus={showLikesDrinkStatus}/>
      </div>
        <div className='listCard-style'>
          {status === 'loading' && <h2>Loading...</h2>}
        
        {error &&  <h2>An error occured: {error}</h2>}
        
        { whatDrinkListShow.map(drink  => <CardComponent {...drink} key ={drink.id}/>)} 
        </div>
        
    </div>
  )
}


export default App;
