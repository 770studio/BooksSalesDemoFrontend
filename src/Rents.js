import * as React from "react";
import moment from "moment";

import {
  List,
  Edit,
  Datagrid,
  TextField,
  DateField,
  SimpleForm,
  TextInput, Create, SelectInput, BooleanInput , ReferenceField, ReferenceInput, NumberInput, DateInput 
} from "react-admin";
//import BooleanField from "./BooleanField";
import { FunctionField } from 'react-admin'
import { BooleanField } from 'react-admin';
 

import { cloneElement, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
    useListContext,
    TopToolbar,
    CreateButton,
    ExportButton,
    Button,
    sanitizeListRestProps,
} from 'react-admin';
import IconEvent from '@material-ui/icons/Event';

const ListActions = (props) => {
    const {
        className,
        exporter,
        filters,
        maxResults,
        ...rest
    } = props;
    const {
        currentSort,
        resource,
        displayedFilters,
        filterValues,
        hasCreate,
        basePath,
        selectedIds,
        showFilter,
        total,
    } = useListContext();
    return (
        <TopToolbar className={className} {...sanitizeListRestProps(rest)}>
                <div ><strong>Стоимость аренды за 1 день: 1000 руб </strong>
      </div>
            {filters && cloneElement(filters, {
                resource,
                showFilter,
                displayedFilters,
                filterValues,
                context: 'button',
            })}
            <CreateButton label={"Новая аренда"} basePath={basePath} />
 
            {/* Add your custom actions */}
            <Button
                onClick={() => { alert('Your custom action'); }}
                label="Show calendar"
            >
                <IconEvent />
            </Button>
        </TopToolbar>
    );
};






export const RentList = (props) => (
  <List {...props} actions={<ListActions />}  title="Аренда книги" sort={{ field: 'createdAt', order: 'DESC' }} >
    <Datagrid rowClick="">
      <TextField source="id" />
  
      <ReferenceField label="Книга" source="book_id" reference="books"  >
      <FunctionField
                    render={record => `${record.name} ${record.author}`}
                />
                
            </ReferenceField>

      <DateField source="createdAt" label="Дата выдачи" />
    </Datagrid>
  </List>
);












/* 


export const RentEdit = (props) => (
  <Edit {...props}>
    <SimpleForm redirect="list" validate={validateRentCreation}>
      <TextInput disabled source="id" />
      <TextInput source="device_id" label="Device ID" />
      <TextInput source="name" />
 
      <ReferenceInput label="Status" sort={{ field: 'index', order: 'ASC' }} source="order_status" reference="order_status">
          <SelectInput optionText="caption" />
      </ReferenceInput>

      <ReferenceInput label="Vehicle type" source="vehicle_type" reference="vehicle_types" >
     
          <SelectInput optionText="name" />
      </ReferenceInput>
   

      <TextInput source="order_id" label="Order Id" />


      <BooleanInput  source="blocked" />
      <BooleanInput  source="available" />
    </SimpleForm>
  </Edit>
);
 */
const validateRentCreation = (values) => {
  const errors = {};
 console.log(values)

 if (values.count=='') {
  errors.count = ['Количество обязательно указывать'];
 }

  if (!values.count) {
      errors.count = ['Здесь нужно указать число'];
  }
  if (!values.deposit) {
    errors.deposit = ['Залог обязательно указывать'];
  }
  if (!values.book_id) {
    errors.book_id = ['Книгу надо выбрать'];
  }
  if (!values.user_id) {
    errors.user_id = ['Арендатора надо выбрать'];
  }
  if (!values.deadline) {
    errors.deadline = ['Дату надо выбрать'];
  } else if(values.deposit) {

    var days =  moment(values.deadline).diff(moment(), "days") ;
    var totalCost = 1000*values.count*days;

   // console.log(totalCost,100*(values.deposit/totalCost) );
    if( 100*(values.deposit/totalCost) < 30 ) 
            errors.deposit = ['Залог должен быть не менее 30% от:' + totalCost +
            ' (всего книг:' + values.count + ' * ' + 'всего дней:' + days + ' * ' +
            'цена за одну книгу за день: 1000)' 
          ];

  }



   

  
/* 
   if (isNaN(values.deposit)) {
    errors.deposit = ['Здесь нужно указать число'];
    values.deposit = 0.00;
  }
 */
   
     

  return errors
};

const countChanged = event => {
// console.log(event.target, parseInt(event.target.value))
  
};

const depositChanged = event => {

  //console.log(event.target.value.toFixed(2))
  
};

export const RentCreate = (props) => (
  <Create {...props}>
    <SimpleForm redirect="list" validate={validateRentCreation}>
      <NumberInput  label="Количество" format={v => parseInt(v)} source="count" onChange={countChanged}  />
      <NumberInput  label="Залог" format={v => parseFloat(v).toFixed(2)}  source="deposit" onChange={depositChanged} />
      <DateInput source="deadline" label="Срок аренды" />
      <ReferenceInput label="Книга" source="book_id" reference="books" >
        <SelectInput optionText={record => `${record.name} ${record.author}`} />
      </ReferenceInput>
      <ReferenceInput label="Арендатор" source="user_id" reference="users" >
        <SelectInput optionText="name" />
      </ReferenceInput> 
    </SimpleForm>
  </Create>
);
