<template>

  <div class="abortJob">
    <div class="row">
      <div class="form-group form-inline col-md-12">
        <label for="presetName">Preset Name:</label>
        <input type="text" v-model="presetName" class="form-control" id="presetName">
        <button type="button" v-on:click="lookupPreset" class="btn btn-info">Lookup SessionId</button>
      </div>
    </div>

    <div class="alert alert-danger" role="alert" v-if="errorMessage">
      <p>{{errorMessage}}</p>
    </div>
    <div class="alert alert-success" role="alert" v-else-if="successMessage">
      <p>{{successMessage}}</p>
    </div>

    <div class="row">
      <div class="form-group col-md-12">
        <label for="sessionId">Session Id</label>
        <textarea type="text" v-model="formData.sessionId" class="form-control" id="sessionId" rows="5"></textarea>
      </div>
    </div>

    <button type="button" class="btn btn-lg btn-danger"
      v-on:click="abortJob">Abort Job</button>

  </div>

</template>

<script>
import { ConfigConstants } from '../../models/ConfigConstants';

export default {
  data() {
    return {
      formData: {
        sessionId: ''
      },
      successMessage: '',
      errorMessage: ''
    }
  },
  methods: {
    lookupPreset() {
      this.resetMessages();
      this.$http.get(`${ConfigConstants.SERVER_BASE_URL}/presets/${this.presetName}`)
        .then((response) => {
          console.log(response);
          this.formData.sessionId = response.body.data.sessionId;
        }).catch((error) => {
          console.log(error);
        });
    },
    resetMessages() {
      this.successMessage = '';
      this.errorMessage = '';
    },
    abortJob() {
      this.resetMessages();
      this.$http.post(`${ConfigConstants.SERVER_BASE_URL}/session/kill`, this.formData.sessionId)
        .then((response) => {
          console.log(response);
          this.successMessage = response.bodyText;
        }).catch((response) => {
          this.errorMessage = response.bodyText;
        });
    }
  }
}


</script>

<style scoped>

.abortJob {
  padding: 50px;
}

</style>
