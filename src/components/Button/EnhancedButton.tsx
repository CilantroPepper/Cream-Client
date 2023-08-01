import { ButtonEmits, ButtonProps } from 'element-plus'
import { FunctionalComponent } from 'vue'
import { ElButton } from 'element-plus'

const EnhancedButton: FunctionalComponent<ButtonProps, ButtonEmits> = (props, context) => (
    <ElButton { ...props } { ...context } v-btn v-ripple v-slots={ context.slots }/>
)

export default EnhancedButton