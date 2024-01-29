import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Identify from '../Identify/Identify';
import AccountMenu from '../AccountMenu/AccountMenu';
import { UserOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import './Deposit.css';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { PaymentDeposite } from '../../Redux/action';
import DepositCoin from './DepositCoin/DepositCoin';


function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const dispatch = useDispatch()
  const payment = useSelector(state => state.payment);
  const [value, setValue] = React.useState(0);
  const [amount, setAmount] = React.useState('');
  const [redirected, setRedirected] = React.useState(false); // Nu
 console.log(payment);

 const handleChange = (event, newValue) => {
  setValue(newValue);
};
 
const handleAmount = async (e) => {
  const value = e.target.value;
  // Check if the value is a valid number
  if (!isNaN(value)) {
    setAmount(value);
  }
};


const handleSubmit = async (e) => {
  e.preventDefault();
  console.log('Amount:', amount);

  try {
    await dispatch(PaymentDeposite(amount));

    // Verifica si ya se ha redirigido
    if (!redirected) {

      if (payment && payment.url) {
        // Redirige al cliente a la URL de la sesión
        window.location.href = payment.url;
        // Actualiza el estado para indicar que ya se ha redirigido
        setRedirected(true);
      } else {
        console.error('Error: No se encontró la URL de pago en el estado.');
      }
    }
  } catch (error) {
    console.error('Error during payment:', error);
  }
};
 

  
  
  
  return (
   <div>
 <Identify />
    <Box >
      <Box sx={{ borderBottom: 1, borderColor: 'divider', }} className='container-deposit'  >
        <Tabs value={value} onChange={handleChange} className='tabs-deposit' aria-label="basic tabs example">
          <Tab  label="Pagos online" {...a11yProps(0)} />
          <Tab  label="Transferencia" {...a11yProps(1)} />

        </Tabs>
      </Box>
      <form onSubmit={handleSubmit}>    
      <CustomTabPanel value={value}  index={0}>
            <Input
              onChange={handleAmount}
              size="large"
              placeholder="Introduzca la cantidad del depósito"
              prefix={'USD'}
              type='number'
              name="amount" 
              value={amount}
            />
            
            <Button  type='submit' variant="contained" sx={{marginTop: "2em"}} >
              Continuar
            </Button>
      </CustomTabPanel>
          </form>
      <CustomTabPanel value={value} index={1}>
       
       <h1 className='title-banca'>
       Depósito mediante transferencia
       </h1>
       <div className="data-container">
 <DepositCoin/>
  
       </div>

      </CustomTabPanel>

    </Box>
   </div>
  );
}