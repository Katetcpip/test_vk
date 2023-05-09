import { SmileOutlined } from '@ant-design/icons';
import { notification, TimePicker, DatePicker} from 'antd';
import {useState} from 'react'
import './App.css'
import dateFormat from "dateformat";
import { Radio, Form, Input, Button, Select } from 'antd';

const { Option } = Select;

const App = () => {

    const chooseTower : Array<string> = ['А', 'Б'];
    const chooseFloor : Array<number> = [];
    const chooseRoom : Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const timeIntervals : Array<string> = [
        '09:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00', 
        '12:00 - 13:00', '13:00 - 14:00', '14:00 - 15:00', 
        '15:00 - 16:00', '16:00 - 17:00', '17:00 - 18:00', 
        '18:00 - 19:00', '19:00 - 20:00', '20:00 - 21:00'
    ]

    for (let floor : number = 3; floor <= 27; floor++){
        chooseFloor.push(floor);
    }

    const [name, setName] = useState('');
    const [tower, setTower] = useState('А');
    const [floor, setFloor] = useState('3');
    const [room, setRoom] = useState(1);
    const [msg, setMsg] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState();
    const [participants, setParticipants] = useState(1);

    const [api, contextHolder] = notification.useNotification();
    const openNotification : Function = () : void => {
        api.open({
          message: 'Успех!',
          description:
            'Мы получили вашу заявку!',
          icon: <SmileOutlined style={{ color: '#108ee9' }} />,
        });
      };

    const onChangeData = () => {
        let dataReserv;
        if (date === '') {dataReserv = dateFormat(new Date() , 'dd mm yyyy')} else {dataReserv = date}
        const data = {
            Name : name,
            Tower : tower,
            Floor: floor,
            Room: room,
            Data: dataReserv,
            Time : time,
            Participants: participants,
            Messsage: msg
        }
        console.log(JSON.stringify(data))
        openNotification()
        // localStorage.setItem(tower, JSON.stringify(data))

    }

    const onChange = (date:any, dateString:any) => {
        setDate(dateString)
      };

      const Clear = () => {
        setMsg('')
        setTower('А')
        setFloor('3')
        setRoom(1)
        setParticipants(1)
        setName('')
      }

    return (
        <div className='flex mainBlock pt-8 pb-8'>
            {contextHolder}
            <Form className='classForm md:w-1/3 w-10/12 z-50' onFinish={() => onChangeData()} >

            <label htmlFor="firstName" className='textForInput relative z-50'>Название встречи</label>
            <Form.Item
                name="nickname"
                className="styleBlock"
                rules={[{ required: true, message: 'Введите название встречи!', whitespace: true }]}
            >
                <Input className='inputStyle' onChange={(e) => setName(e.target.value)} placeholder={"Встреча..."} value={name}/>
            </Form.Item>

            <label htmlFor="firstName" className='textForInput relative z-50'>Башня</label>
            <Form.Item
                name='tower'
                className="styleBlock"
                initialValue="A"
                >
                <Select className='!inputStyle rounded-xl' onChange={(e) => setTower(e)}>
                {chooseTower.map( (el) =>
                    <Option value={el} key={el}>{el}</Option> )
                }
                </Select>
            </Form.Item>

            <label htmlFor="firstName" className='textForInput relative z-50'>Этаж</label>
            <Form.Item
                name='floor'
                className="styleBlock"
                initialValue="3"
                >
                <Select className='!inputStyle rounded-xl' onChange={(e) => setFloor(e)}>
                {chooseFloor.map( (el) =>
                    <Option value={el} key={el}>{el}</Option> )
                }
                </Select>
            </Form.Item>

            <label htmlFor="firstName" className='textForInput relative z-50'>Переговорка</label>
            <Form.Item
                name='room'
                className="styleBlock"
                initialValue="1"
                >
                <Select className='!inputStyle rounded-xl' onChange={(e) => setRoom(e)}>
                {chooseRoom.map( (el) =>
                    <Option value={el} key={el}>{el}</Option> )
                }
                </Select>
            </Form.Item>

            <label htmlFor="email" className='textForInput w-full'>Дата и интервал времени</label>
            <Form.Item className="styleBlock" 
                        name="date_related_controls" 
                        rules={[{ required: true, message: 'Выберите дату!' }]}>
                <DatePicker placeholder='Выберите дату...' name="date-picker" onChange={onChange} className='inputStyle !w-full'/>
            </Form.Item>

            <Form.Item
                name='time_related_controls'
                className="styleBlock"
                rules={[{ required: true, message: 'Выберите время!' }]}
                >
                <Select onChange={(e) => setTime(e)} className='!inputStyle rounded-xl' placeholder={(new Date()).getHours() + ":"+ (String((new Date()).getMinutes()).length === 2 ? (new Date()).getMinutes() : "0" + (new Date()).getMinutes())}>
                    {timeIntervals.map( (el) => {
                        return (
                            
                        JSON.stringify(new Date()).substr(1, 10) == date 
                        
                        ? String((new Date()).getHours()) < (el[0] + el[1]) && <Option value={el} key={el}>{el}</Option>   

                        : <Option value={el} key={el}>{el}</Option>)
                    })}
                </Select>
            </Form.Item>

            <label htmlFor="participants" className='textForInput w-full'>Количество участников</label>
                <Radio.Group onChange={e => setParticipants(e.target.value)} value={participants} className='inputStyle'>
                <Radio className='radioStyle' value={1}>1</Radio>
                <Radio className='radioStyle' value={2}>2</Radio>
                <Radio className='radioStyle' value={3}>3+</Radio>
            </Radio.Group>

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
                <button type="reset" onClick={() => Clear()} className="btnClear hover:scale-95 transition hover:duration-500">Очистить</button>
                            
                <Form.Item>
                    <Button type="primary" htmlType="submit" 
                            className="!btnBook hover:scale-95 transition 
                                hover:duration-500 !bg-white 
                                !px-8 !p-2 h-full !text-violet-800 
                                !rounded-md !font-semibold !text-center">
                    Отправить
                    </Button>
                </Form.Item>
            </div>
            </Form>

            <div className='colorBlock md:top-80 md:left-96 top-44 left-10'></div>
            <div className='colorBlock2 md:bottom-44 md:right-96 bottom-20 right-20'></div>
            <div className='colorBlock3 md:top-44 md:right-96 top-10 right-20'></div>
            <div className='w-full text-base- text-gray-700 text-center pt-10'>github: Katetcpip</div>
        </div>
    )
}

export default App; 