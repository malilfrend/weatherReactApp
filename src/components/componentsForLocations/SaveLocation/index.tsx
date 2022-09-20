import React from 'react';
import 'antd/dist/antd.css';
import { Button, Input, Form, InputNumber } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import s from './SaveLocation.module.scss';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
  setChosenLocation,
  setLocationsItem,
  resetFlag,
} from './../../../redux/slices/locationsSlice';

type InitialValuesType = {
  name: string;
  lat: number | null;
  lon: number | null;
};

export default function SaveLocation() {
  const dispatch = useAppDispatch();
  const isError = useAppSelector((state) => state.location.isError);
  const [showSaveWindow, setShowSaveWindow] = React.useState<boolean>(false);
  const showWindow = showSaveWindow ? `${s.show_window}` : '';
  const initialValues: InitialValuesType = {
    name: '',
    lat: null,
    lon: null,
  };
  const [form] = Form.useForm();

  const onFinish = (values: InitialValuesType): void => {
    dispatch(setLocationsItem({ ...values }));
    dispatch(setChosenLocation({ ...values }));
    dispatch(resetFlag());
    form.resetFields();
    setShowSaveWindow(!showSaveWindow);
  };

  return (
    <div>
      {isError ? null : (
        <div className={s.save_location}>
          <Button type="primary" onClick={() => setShowSaveWindow(!showSaveWindow)}>
            Add location
          </Button>
          <div className={s.save_window + ' ' + showWindow}>
            <div className={s.close_item} onClick={() => setShowSaveWindow(false)}>
              <CloseOutlined />
            </div>
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
              <Button htmlType="submit" style={{ width: '100%' }}>
                Add and see new weather
              </Button>
            </Form>
          </div>
        </div>
      )}
    </div>
  );
}
