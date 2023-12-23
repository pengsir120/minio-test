<template>
    <div class="minio-container common-container">
        <el-button type="primary" @click="handleUploadPic">上传图片</el-button>
        <transition name="transition-preview">
            <div class="demo-image__preview" style="margin-top:20px" v-if="imageUrl">
                <el-image style="width: 100px; height: 100px" :src="imageUrl" :preview-src-list="srcList">
                </el-image>
            </div>
        </transition>
        <el-button type="primary" @click="handleUploadVideo">上传视频</el-button>
    </div>
</template>

<script>
// import { Message } from "element-plus";
import { isImage, getVideoTime } from "@/utils";
import { uploadImage } from "@/request/api";

export default {
    data() {
        return {
            imageUrl: "",
            srcList: [],
        };
    },

    methods: {
        handleUploadPic() {
            const input = document.createElement("input");
            input.setAttribute("type", "file");
            input.setAttribute("multiple", "multiple");
            input.setAttribute("accept", "image/*");
            input.click();
            const _this = this; // 如果不想使用这种语法,onchange的函数换成箭头函数,即可解决this指向问题
            input.onchange = async function (event) {
                const file = event.target.files[0];
                if (!isImage(file)) {
                    // return Message.error("不是可上传的图片格式");
                    console.log("不是可上传的图片格式");
                }
                const formData = new FormData();
                formData.append("file", file);
                const data = await uploadImage(formData);
                if (data?.code && data.code == 200) {
                    _this.imageUrl = data.url;
                    _this.srcList = [].concat(data.url);
                }
            };
            input.remove();
        },
        handleUploadVideo() {
            const input = document.createElement("input");
            input.setAttribute("type", "file");
            input.click();
            input.onchange = async function (event) {
                const file = event.target.files[0];
                const video = document.createElement('video')
                video.preload = 'metadata'
                video.src = URL.createObjectURL(file)
                video.onloadedmetadata = function() {
                  window.URL.revokeObjectURL(video.src)
                  console.log(getVideoTime(video.duration));
                }

                const formData = new FormData();
                formData.append("file", file);
                const data = await uploadImage(formData);
                if (data?.code && data.code == 200) {
                    console.log('成功');
                }
            };
            input.remove();
        },
    },
};
</script>

<style scoped>
.fold-height-enter-active,
.fold-height-leave-active {
    transition: height 0.5s ease;
    overflow: hidden;
}

.fold-height-enter,
.fold-height-leave-to {
    height: 0 !important;
}
</style>
