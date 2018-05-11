<template>

  <div id="createJob">

    <div class="alert alert-danger" role="alert" v-if="errorMessage">
      <p>{{errorMessage}}</p>
    </div>
    <div class="alert alert-success" role="alert" v-else-if="successMessage">
      <p>{{successMessage}}</p>
    </div>

    <div v-if='formVisible'>

      <form>

        <div class="row">
          <div class="form-group form-inline col-md-12">
            <label for="presetName">Preset Name:</label>
            <input type="text" v-model="presetName" class="form-control" id="presetName">
            <button type="button" v-on:click="lookupPreset" class="btn btn-info">Lookup Preset</button>
          </div>
        </div>

        <div class="row">
          <div class="form-group col-md-6">
            <label for="sessionId">Session Id</label>
            <textarea type="text" v-model="formData.sessionId" class="form-control" id="sessionId" rows="5"></textarea>
          </div>
          <div class="form-group col-md-6">
            <label for="hashtags">Hashtags (Ex: BestDayEver, happyfriday)</label>
            <textarea type="text" v-model="formData.hashtagText" class="form-control"
              v-on:change="formatHashtag" id="hashtags" rows="5"></textarea>
          </div>
        </div>

        <div class="row">
          <div class="form-group col-md-4">
            <label for="noOfPhotos">Number of Photos:</label>
            <input type="number" v-model="formData.noOfPhotos" class="form-control" id="noOfPhotos">
          </div>
          <div class="form-group col-md-4">
            <label for="noOfTimesToLoop">Loop Count:</label>
            <input type="number" v-model="formData.noOfTimesToLoop" class="form-control" id="noOfTimesToLoop">
          </div>
          <div class="form-group col-md-4">
            <label for="maxNoOfFollowers">Maximum Followers:</label>
            <input type="number" v-model="formData.maxNoOfFollowers" class="form-control" id="maxNoOfFollowers">
          </div>
        </div>

        <div class="row">
          <div class="form-group col-md-4">
            <label for="timeMin">Minimum Wait Time:</label>
            <input type="number" v-model="formData.timeMin" class="form-control" id="timeMin">
          </div>
          <div class="form-group col-md-4">
            <label for="timeMax">Maximum Wait Time:</label>
            <input type="number" v-model="formData.timeMax" class="form-control" id="timeMax">
          </div>
        </div>

        <div class="row">
          <div class="col-md-2">
            <button type="button" v-on:click="runJob" class="btn btn-primary btn-lg">Run Job</button>
          </div>
          <div class="col-md-2">
            <button type="button" v-on:click="savePreset" class="btn btn-warning btn-lg">Save Preset</button>
          </div>
        </div>

      </form>

    </div>

    <button type="button" class="btn btn-lg btn-info"
      v-on:click="showForm" v-if="!formVisible">Submit Another Job</button>

    <spinner v-bind:showSpinner="showSpinner"></spinner>

  </div>

</template>

<script>
import { ConfigConstants } from '../../models/ConfigConstants';

export default {
  name: 'create-job',
  data() {
    return {
      formVisible: true,
      presetName: '',
      successMessage: '',
      errorMessage: '',
      showSpinner: false,
      formData: this.getDefaultForm()
    }
  },
  methods: {
    getDefaultForm() {
      return {
        sessionId: '',
        noOfPhotos: 5,
        noOfTimesToLoop: 10,
        timeMin: 25,
        timeMax: 30,
        maxNoOfFollowers: 500,
        hashtagText: '',
        hashtags: []
      };
    },
    showForm () {
      this.formVisible = true;
    },
    hideForm () {
      this.formVisible = false;
    },
    resetMessages() {
      this.successMessage = '';
      this.errorMessage = '';
    },
    formatHashtag() {
      console.log(this.formData.hashtagText);
      this.hashtagTextToArray();
      this.hashtagArrayToText();
    },
    hashtagTextToArray() {
      this.formData.hashtags = this.formData.hashtagText.replaceAll(" ", "")
        .toLowerCase().split(",");
    },
    hashtagArrayToText() {
      if (Array.isArray(this.formData.hashtags))
        this.formData.hashtagText = this.formData.hashtags.join(", ");
    },
    runJob() {
      this.showSpinner = true;
      this.resetMessages();
      this.hashtagTextToArray();
      this.$http.post(`${ConfigConstants.SERVER_BASE_URL}/hashtag/looplike`, this.formData)
        .then((response) => {
          this.showSpinner = false;
          console.log(response);
          this.hideForm();
          this.successMessage = response.bodyText;
        }).catch((response) => {
          this.showSpinner = false;
          console.log(response);
          let errorObj = response.body.errors[0];
          this.errorMessage = errorObj.defaultMessage;
        });
    },
    lookupPreset() {
      this.showSpinner = true;
      this.$http.get(`${ConfigConstants.SERVER_BASE_URL}/presets/${this.presetName}`)
        .then((response) => {
          this.showSpinner = false;
          console.log(response);
          this.formData = this.$_.get(response, "body.data", {});
          this.hashtagArrayToText();
        }).catch((error) => {
          this.showSpinner = false;
          console.log(error);
        });
    },
    savePreset() {
      this.showSpinner = true;
      this.$http.post(`${ConfigConstants.SERVER_BASE_URL}/presets/add`, {
        name: this.presetName,
        data: this.formData
      }).then((response) => {
          this.showSpinner = false;
          console.log(response);
          this.successMessage = response.bodyText;
      }).catch((response) => {
          this.showSpinner = false;
          console.log(response);
          let errorObj = response.body.errors[0];
          this.errorMessage = errorObj.defaultMessage;
      });
    }
  }
}

</script>

<style scoped>

  #createJob {
    text-align: left;
    font-size: 18px;
    padding-top: 20px;
    padding-bottom: 20px;
  }

</style>
