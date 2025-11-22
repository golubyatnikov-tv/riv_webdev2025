import { Button, ColorPicker, Form, Input, InputNumber, Select } from "antd";
import type { AggregationColor } from "antd/es/color-picker/color";
import axios from "axios";
import type { FC } from "react";
import { useSaveCosmicObjectMutation } from "./api";
import type { CosmoObject } from "./types";

export const CosmoObjectForm: FC<{
    initialValues?: Partial<CosmoObject>;
    onSuccess?: (data: CosmoObject) => void;
    onCancel?: () => void;
}> = ({ initialValues, onSuccess, onCancel }) => {
    const { mutateAsync: saveCosmicObject } = useSaveCosmicObjectMutation();
    const [form] = Form.useForm<CosmoObject>();
    return <Form<CosmoObject>
        form={form}
        labelCol={{ span: 4 }}
        layout='horizontal'
        size="small"
        initialValues={initialValues}
        onFinish={async (values) => {
            const color = (values.color as unknown as AggregationColor);
            const data = {
                ...values,
                color: typeof color === 'string' ? color : color.toHexString()
            }
            try {
                await saveCosmicObject(data);
                onSuccess?.(data);
            } catch (err) {
                if (axios.isAxiosError(err) && err.response?.status === 400) {
                    form.setFields(err.response?.data.errors.map((error: { path: string, msg: string }) => ({
                        name: error.path,
                        errors: [error.msg]
                    })) ?? []);
                }
            }
        }}
    >
        <Form.Item label="ID" name="id" hidden>
            <Input />
        </Form.Item>
        <Form.Item label="Название" name="name"
        //rules={[{ required: true, message: 'Название обязательно' }]}
        >
            <Input />
        </Form.Item>
        <Form.Item label="Диаметр" name="diameterKm" rules={[
            { required: true },
            { type: 'number', min: 1 }
        ]}>
            <InputNumber />
        </Form.Item>
        <Form.Item label="Цвет" name="color" rules={[{ required: true }]}>
            <ColorPicker format='hex' />
        </Form.Item>
        <Form.Item label="Тип" name="type" rules={[{ required: true }]}>
            <Select options={[
                { label: 'Планета земной группы', value: 'Планета земной группы' },
                { label: 'Газовый гигант', value: 'Газовый гигант' }
            ]} />
        </Form.Item>
        <Form.Item label=" " colon={false}>
            <Button type="primary" htmlType="submit">
                Сохранить
            </Button>
            <Button type="link" onClick={() => {
                onCancel?.();
            }}>Отмена</Button>
        </Form.Item>
    </Form>
}