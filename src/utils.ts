import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('@user_key', jsonValue);
  } catch (e) {
    console.log('unable to save data');
    // saving error
  }
};

export const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@user_key');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};

export function formatCurrency(
  amount: string | number,
  currency: string,
): string {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 1,
  });

  let num;

  num = Number(amount);

  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }

  return formatter.format(Number(amount));
}
