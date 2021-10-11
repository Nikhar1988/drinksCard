import { Button } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import { toggleShowLikesDrinks } from '../store/reducer'

export const FilterLike = ({showLikesDrinkStatus}) => {
    const dispatch = useDispatch();

    const showLike = (likeValue) => { 
        dispatch(toggleShowLikesDrinks(!likeValue))
    }
    
    
    return (
        <div>
            <Button type="primary" onClick={() => showLike(showLikesDrinkStatus)}>Show favorite drinks</Button>
        </div>
    )
}
