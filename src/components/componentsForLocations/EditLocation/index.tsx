import React from 'react';
import { Button, Input, Form, InputNumber } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { LocationsItemType, PropsInLocationsComponent } from './../../../types';
import {
  updateLocationsItem,
  resetFlag,
  updateRealUserLocation,
  setChosenLocation,
} from './../../../redux/slices/locationsSlice';
import s from './EditLocation.module.scss';

export default function EditLocation(props: PropsInLocationsComponent) {
  const chosenLocation = useAppSelector((state) => state.location.chosenLocation);
  const dispatch = useAppDispatch();
  const initialValues: LocationsItemType = {
    name: props.name,
    lat: props.lat,
    lon: props.lon,
  };
  const [form] = Form.useForm();

  const onFinish = (values: LocationsItemType): void => {
    if (props.index === -1) {
      dispatch(updateRealUserLocation(values.name));
    } else {
      dispatch(updateLocationsItem({ ...values, index: props.index }));
    }

    // Здесь прописана логика для того, чтобы не происходило лишних запросов на сервер при изменении только имени или при сохранении без изменений
    if (chosenLocation.name === initialValues.name && props.index !== -1) {
      if (chosenLocation.lat === values.lat && chosenLocation.lon === values.lon) {
        dispatch(setChosenLocation({ ...values }));
      } else {
        dispatch(setChosenLocation({ ...values }));
        dispatch(resetFlag());
      }
    }

    props.showUnshowEditWindow();
  };
  return (
    <div className={s.edit_location}>
      <Form
        form={form}
        name="add location"
        layout="vertical"
        initialValues={initialValues}
        onFinish={onFinish}>
        <Form.Item
          label="Title of location"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input title!',
            },
          ]}>
          <Input maxLength={16} />
        </Form.Item>
        {props.index === -1 ? null : (
          <div>
            <Form.Item
              label="Latitude"
              name="lat"
              rules={[
                {
                  required: true,
                  message: 'Please input latitude as number!',
                },
                {
                  type: 'number',
                  max: 90,
                  message: "It can't be more 90 degrees",
                },
                {
                  type: 'number',
                  min: -90,
                  message: "It can't be less -90 degrees",
                },
              ]}>
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
              label="Longitude"
              name="lon"
              rules={[
                {
                  required: true,
                  message: 'Please input longitude as number!',
                },
                {
                  type: 'number',
                  max: 180,
                  message: "It can't be more 180 degrees",
                },
                {
                  type: 'number',
                  min: -180,
                  message: "It can't be less -180 degrees",
                },
              ]}>
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
          </div>
        )}
        <Button htmlType="submit" style={{ width: '100%' }}>
          Edit
        </Button>
      </Form>
    </div>
  );
}
