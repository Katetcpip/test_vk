import { SmileOutlined } from '@ant-design/icons';
import { notification, TimePicker, DatePicker} from 'antd';
import {useState} from 'react'
import './App.css'
import dateFormat from "dateformat";

const App = () => {

    const chooseTower = ['А', 'Б'];
    const chooseFloor : Array<number> = [];
    const chooseRoom : Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    for (let floor : number = 3; floor <= 27; floor++){
        chooseFloor.push(floor);
    }

    const [tower, setTower] = useState('А');
    const [floor, setFloor] = useState('3');
    const [room, setRoom] = useState('1');
    const [msg, setMsg] = useState('');
    const [date, setDate] = useState('');
    const [timeFrom, setTimeFrom] = useState('');
    const [timeTo, setTimeTo] = useState('');

    const [api, contextHolder] = notification.useNotification();
    const openNotification : Function = () : void => {
        api.open({
          message: 'Успех!',
          description:
            'Мы получили вашу заявку!',
          icon: <SmileOutlined style={{ color: '#108ee9' }} />,
        });
      };

    const onChanheData = (e:any) => {
        e.preventDefault();
        let dataReserv;
        if (date === '') {dataReserv = dateFormat(new Date() , 'dd mm yyyy')} else {dataReserv = date}
        const data = {
            Tower : tower,
            Floor: floor,
            Room: room,
            Data: dataReserv,
            TimeFrom: timeFrom,
            TimeTo: timeTo,
            Messsage: msg
        }
        console.log(JSON.stringify(data))
        openNotification()
    }

    const onChange = (date:any, dateString:any) => {
        setDate(dateString)
      };

    const onChange2 = (e:any) => {
        let timeFrom = e[0].$H + ':' + e[0].$m + ':' + e[0].$s       
        let timeTo = e[1].$H + ':' + e[1].$m + ':' + e[1].$s
        setTimeTo(timeTo);
        setTimeFrom(timeFrom)
      };

      const Clear = () => {
        setMsg('')
        setTower('А')
        setFloor('3')
        setRoom('1')
      }

    return (
        <div className='flex mainBlock'>
            {contextHolder}
            <form className='classForm md:w-1/3 w-10/12 z-50' onSubmit={e => onChanheData(e)}>

                <div className="styleBlock">
                    <label htmlFor="firstName" className='textForInput relative z-50'>Башня</label>
                    <select className='inputStyle'
                            onChange={e => setTower(e.target.value)}
                    >{chooseTower.map( (el) =>
                        <option className='text-gray-400 text-xl' key={el}>{el}</option> )
                    }</select>
                </div>

                <div className="styleBlock">
                    <label htmlFor="firstName" className='textForInput relative z-50'>Этаж</label>
                    <select className='inputStyle'
                    onChange={e => setFloor(e.target.value)}
                    >{chooseFloor.map( (el) =>
                        <option className='text-gray-800 text-xl' key={el}>{el}</option> )
                    }</select>
                </div>

                <div className="styleBlock">
                    <label htmlFor="email" className='textForInput'>Переговорка</label>
                    <select className='inputStyle'
                    onChange={e => setRoom(e.target.value)}
                    >{chooseRoom.map( (el) =>
                        <option className='text-gray-800 text-xl' key={el}>{el}</option> )
                    }</select>
                </div>

                <div className="styleBlock flex !flex-row flex-wrap justify-between">
                    <label htmlFor="email" className='textForInput w-full'>Дата и интервал времени</label>
                    <DatePicker onChange={onChange} className='inputStyle sizePicker'/>
                    <TimePicker.RangePicker  onChange={value => onChange2(value)} className='inputStyle sizePicker'/>
                </div>

                <div className="styleBlock">
                    <label htmlFor="comment" className='textForInput'>Комментарий</label>
                    <input 
                        name="comment" 
                        type="text" 
                        className='inputStyle !pb-12' 
                        value={msg}
                        placeholder='Пожелания...'
                        onChange={e => setMsg(e.target.value)}/>
                </div>

                <div className="flex flex-row flex-wrap mt-8 gap-4">
                    <button type="submit" className="btnBook hover:scale-95 transition hover:duration-500">Отправить</button>
                    <button type="reset" onClick={Clear} className="btnClear hover:scale-95 transition hover:duration-500">Очистить</button>
                </div>
            </form>

            <div className='colorBlock md:top-80 md:left-96 top-44 left-10'></div>
            <div className='colorBlock2 md:bottom-44 md:right-96 bottom-20 right-20'></div>
            <div className='colorBlock3 md:top-44 md:right-96 top-10 right-20'></div>
        </div>
    )
}

export default App; 