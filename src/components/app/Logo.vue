<template>
    <img :width="width" :height="height" src="/static/images/ugm-logo.png" alt="ugm-logo">
</template>

<script>
export default {
    props: {
        width: {
            default: '50px',
            type: String | Number
        },
        height: {
            default: '50px',
            type: String | Number
        }
    }
}
</script>

