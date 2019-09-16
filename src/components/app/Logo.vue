<template>
    <img :width="width" :height="height" src="@/assets/ugm-logo.png" alt="ugm-logo">
</template>

<script>
export default {
    props: {
        width: {
            default: '120px',
            type: String | Number
        },
        height: {
            default: '120px',
            type: String | Number
        }
    }
}
</script>

