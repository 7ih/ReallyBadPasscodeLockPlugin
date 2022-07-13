import { webpack } from '@cumcord/modules';

const FormItem = webpack.findByDisplayName('FormItem');
const FormText = webpack.findByDisplayName('FormText');
const classes = {
	...webpack.findByProps('marginBottom20'),
	...webpack.findByProps('formText'),
	...webpack.findByDisplayName('Flex'),
};

export default props => {
	return (
		<FormItem
			title={props.title}
			required={props.required}
			className={`${classes.Direction.VERTICAL} ${classes.Justify.START} ${classes.Align.STRETCH} ${classes.Wrap.NO_WRAP} ${classes.marginBottom20}`}
		>
			{props.children}
			{props.note && <FormText className={`${classes.description} ${classes.marginTop8}`}>{props.note}</FormText>}
		</FormItem>
	);
};
