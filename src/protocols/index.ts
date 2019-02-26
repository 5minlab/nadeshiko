import * as yup from 'yup';

interface TableReq {
	table: string;
}

export const tableSchema = yup.object().shape<TableReq>({
	table: yup.string().required(),
});

interface ItemReq {
	table: string;
	id: number;
}

export const itemSchema = yup.object().shape<ItemReq>({
	table: yup.string().required(),
	id: yup.number().min(0).required(),
});
