 
import { Card, Avatar } from 'antd';
import { HeartFilled, RestOutlined}  from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { removeDrink, likeDrinks } from '../store/reducer';
 
const CardComponent = ({id, title, image, isLiked}) => {
    const { Meta } = Card;
     
    const dispatch = useDispatch()
    
    const deliteDrink =(id) => {
        dispatch(removeDrink(id))
    }
    
    const toggleLikeDrink =(id)=> {
        dispatch(likeDrinks(id))
    }
   
    const colorHeart = isLiked ? '#eb2f96' : '#B6ADAC'

    return (
        <Card 
            style={{ width: 250, 
                    height: 300, 
                    margin: '0px 20px 20px 0px' }}
            cover={
            <img
                alt="drink"
                src={image}
                width='200px'
                height='200px'
            />
            }
            actions={[
                
            <HeartFilled style={{color:colorHeart}} onClick={()=> toggleLikeDrink(id)} />,
            <RestOutlined onClick={()=> deliteDrink(id)}/> 
            ]}
        >
            <Meta
            title={title}
            />
        </Card>
  
    )
}

export default CardComponent;