import './App.css';
import { useState } from 'react';

import { Button } from '@/components';
import { PaymentCalculationContent } from '@/features';

function App() {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  const openPopUp = () => setIsPopUpOpen(true);
  const closePopUp = () => setIsPopUpOpen(false);

  return (
    <>
      <Button title={'Расчет платежей'} onClick={openPopUp} withBorder />
      <PaymentCalculationContent isOpen={isPopUpOpen} onClose={closePopUp} />
    </>
  );
}

export default App;
