import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  AnythingSvg,
  ChlothingSvg,
  ExpensesSvg,
  FoodSvg,
  GadgetSvg,
  InternetSvg,
  InvestmentSvg,
  PosSvg,
  SavingsSvg,
  TransportSvg,
  Utility,
} from '../../assets/svgs';

export interface ScreenDefaultProps {
  navigation: NativeStackNavigationProp<any, any>;
  route?: RouteProp<any, any>;
}

export enum CategoryKeys {
  Food = 'Food',
  Clothing = 'Clothing',
  Transport = 'Transport',
  POS = 'POS',
  Gadget = 'Gadget',
  Personal_Expenses = 'Personal_Expenses',
  Utility_Bills = 'Utility_Bills',
  Internet = 'Internet',
  Savings = 'Savings',
  Investments = 'Investments',
  Miscellaneous = 'Miscellaneous',
}

export enum Categories {
  Food = 'Food and Drinks',
  Clothing = 'Clothing',
  Transport = 'Transport',
  POS = 'POS',
  Gadget = 'Gadget',
  Personal_Expenses = 'Personal Expenses',
  Utility_Bills = 'Utility Bills',
  Internet = 'Internet Bills',
  Savings = 'Savings',
  Investments = 'Investments',
  Miscellaneous = 'Miscellaneous',
}

export enum CategoryColors {
  Food = '#6756E3',
  Clothing = '#3B36BC',
  Transport = '#BE1CA3',
  POS = '#FD3A7D',
  Gadget = '#FF7C5A',
  Personal_Expenses = '#FFBD4E',
  Utility_Bills = '#9078FF',
  Internet = '#68BAA6',
  Savings = '#005242',
  Investments = '#ED3135',
  Miscellaneous = '#296671',
}

export enum CategoryIcons {
  Food = FoodSvg,
  Clothing = ChlothingSvg,
  Transport = TransportSvg,
  POS = PosSvg,
  Gadget = GadgetSvg,
  Personal_Expenses = ExpensesSvg,
  Utility_Bills = Utility,
  Internet = InternetSvg,
  Savings = SavingsSvg,
  Investments = InvestmentSvg,
  Miscellaneous = AnythingSvg,
}
