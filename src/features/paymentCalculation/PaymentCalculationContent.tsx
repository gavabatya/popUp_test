import { FC, useState, useEffect } from 'react';

import { Button, Input, PopUp, Tag, TextButton } from '@/components';

import styles from './styles.module.scss';

interface IProps {
  isOpen: boolean;
  onClose(): void;
}

export const PaymentCalculationContent: FC<IProps> = ({ isOpen, onClose }) => {
  const [selectedTag, setSelectedTag] = useState<string>('12');
  const [inputValue, setInputValue] = useState<string>('');
  const [baseMonthlyPayment, setBaseMonthlyPayment] = useState<number | null>(
    null,
  );
  const [isYearly, setIsYearly] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      document.documentElement.classList.remove('orange-bg');
    } else {
      document.documentElement.classList.add('orange-bg');
    }

    return () => {
      document.documentElement.classList.add('orange-bg');
    };
  }, [isOpen]);

  const handleClose = () => {
    setSelectedTag('12');
    setInputValue('');
    setBaseMonthlyPayment(null);
    setIsYearly(false);
    onClose();
  };

  const handleMonthTagClick = (tag: string) => () => {
    setSelectedTag(tag);
    if (baseMonthlyPayment !== null) {
      const creditAmount = parseFloat(inputValue);
      const months = Number(tag);

      if (!isNaN(creditAmount) && !isNaN(months) && months !== 0) {
        setBaseMonthlyPayment(creditAmount / months);
      }
    }
  };

  const handleCalculate = () => {
    const creditAmount = parseFloat(inputValue);
    const months = parseInt(selectedTag, 10);

    if (!isNaN(creditAmount) && !isNaN(months) && months !== 0) {
      setBaseMonthlyPayment(creditAmount / months);
    } else {
      setBaseMonthlyPayment(null);
    }
  };

  const finalPayment =
    baseMonthlyPayment !== null
      ? isYearly
        ? baseMonthlyPayment * 12
        : baseMonthlyPayment
      : null;

  return (
    <PopUp onClose={handleClose} isOpen={isOpen}>
      <div className={styles.container}>
        <div className={styles.info}>
          <div className={styles.container__title}>
            <span>Платежи по кредиту</span>
            <div
              className={styles.container__closeIcon}
              onClick={handleClose}
            />
          </div>
          <div className={styles.container__textBlock}>
            <span>
              Введите сумму кредита и выберите срок, на который вы хотите его
              оформить.
            </span>
            <span>
              Мы автоматически рассчитаем для вас ежемесячный платеж, чтобы вы
              могли лучше спланировать свои финансы.
            </span>
          </div>
          <div className={styles.container__inputBlock}>
            <Input
              label={'Ваша сумма кредита'}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={'Введите данные'}
            />
            <TextButton title={'Рассчитать'} onClick={handleCalculate} />
          </div>
          <div className={styles.container__checkBoxContainer}>
            <span className={styles.container__checkBoxContainer__checkTitle}>
              Количество месяцев?
            </span>
            <div className={styles.container__checkBlock}>
              <Tag
                value="12"
                checked={selectedTag === '12'}
                onChange={handleMonthTagClick('12')}
              />
              <Tag
                value="24"
                checked={selectedTag === '24'}
                onChange={handleMonthTagClick('24')}
              />
              <Tag
                value="36"
                checked={selectedTag === '36'}
                onChange={handleMonthTagClick('36')}
              />
              <Tag
                value="48"
                checked={selectedTag === '48'}
                onChange={handleMonthTagClick('48')}
              />
            </div>
          </div>
          {finalPayment && (
            <div className={styles.container__resultBlock}>
              <span className={styles.container__checkBoxContainer__checkTitle}>
                Итого ваш платеж по кредиту:
              </span>
              <div className={styles.container__resultBlock__tagBlock}>
                <Tag
                  value="в год"
                  checked={isYearly}
                  onChange={() => setIsYearly(true)}
                />
                <Tag
                  value="в месяц"
                  checked={!isYearly}
                  onChange={() => setIsYearly(false)}
                />
              </div>
              <span className={styles.container__resultBlock__payment}>
                {`${finalPayment.toFixed(2)} рублей ${isYearly ? 'в год' : 'в месяц'}`}
              </span>
            </div>
          )}
          <div className={styles.container__buttonContainer}>
            <Button
              className={styles.container__buttonContainer__button}
              title={'Добавить'}
            />
          </div>
        </div>
      </div>
    </PopUp>
  );
};
