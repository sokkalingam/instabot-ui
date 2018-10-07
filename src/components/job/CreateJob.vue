<template>

  <div id="createJob">

    <div class="alert alert-danger" role="alert" v-if="errorMessage">
      <p>{{errorMessage}}</p>
    </div>
    <div v-else-if="successMessage">
      <div class="alert alert-success" role="alert">
        <p>{{successMessage}}</p>
      </div>
    </div>

    <div v-if='formVisible'>

      <form>

        <h4 class="blink"><b>New Features</b> - Email Notification & Feedback Page</h4>

        <div class="row">
          <div class="form-group form-inline col-md-6">
            <label for="presetName">Preset Name:</label>
            <input type="text" v-model="presetData.name" class="form-control" id="presetName">
            <button type="button" v-on:click="lookupPreset" v-bind:disabled="isLookUpPresetDisabled()" class="btn btn-info">Lookup
              Preset</button>
          </div>

          <div class="form-group form-inline col-md-6">
            <label for="username">Instagram Username:</label>
            <input type="text" v-model="presetData.data.username" class="form-control" id="username">
          </div>
        </div>

        <div class="row">
          <div class="form-group col-md-4">
            <label for="sessionId">Session Id</label>
            <textarea type="text" v-model="presetData.data.sessionId" class="form-control" id="sessionId" rows="5"></textarea>
          </div>
          <div class="form-group col-md-4">
            <label for="hashtags">Hashtags</label>
            <textarea type="text" v-model="presetData.data.hashtagText" class="form-control" v-on:change="formatHashtag"
              id="hashtags" rows="5" v-bind:placeholder="getHashtagsPlaceHolder()"></textarea>
          </div>
          <div class="form-group col-md-4">
            <label for="hashtags">Comments</label>
            <span class="text-right">
              <input class="form-check-input" type="checkbox" v-model="presetData.data.commentOnly" id="commentOnly">
              <span class="form-check-label" for="commentOnly">Comment Only</span>
            </span>
            <textarea type="text" v-model="presetData.data.commentsText" class="form-control" v-on:change="formatComments"
              id="hashtags" rows="5" v-bind:placeholder="getCommentsPlaceHolder()"></textarea>
          </div>
        </div>

        <div class="row">
          <div class="form-group col-md-4">
            <label for="noOfPhotos">Number of Posts:</label>
            <input type="number" min="1" v-model="presetData.data.noOfPhotos" class="form-control" id="noOfPhotos">
          </div>
          <div class="form-group col-md-4">
            <label for="noOfTimesToLoop">Loop Count:</label>
            <input type="number" min="1" v-model="presetData.data.noOfTimesToLoop" class="form-control" id="noOfTimesToLoop">
          </div>
          <div class="form-group col-md-4">
            <label for="maxNoOfFollowers">Maximum Followers:</label>
            <input type="number" v-model="presetData.data.maxNoOfFollowers" class="form-control" id="maxNoOfFollowers">
          </div>
        </div>

        <div class="row">
          <div class="form-group col-md-4">
            <label for="timeMin">Minimum Wait Time:</label>
            <input type="number" v-model="presetData.data.timeMin" class="form-control" id="timeMin">
          </div>
          <div class="form-group col-md-4">
            <label for="timeMax">Maximum Wait Time:</label>
            <input type="number" v-model="presetData.data.timeMax" class="form-control" id="timeMax">
          </div>
        </div>

        <div class="row">
          <div class="form-group form-inline col-md-12">
            <h3>
              <label for="presetName">Total Posts:</label>
              <span class="label label-default">{{getTotalNumberOfPosts()}}</span>
            </h3>
          </div>
        </div>

        <div class="row">
          <div class="form-group col-md-4">
            <label for="email">Email</label>
            <small class="blink">(Get notified when job is finished)</small>
            <input type="text" v-model="presetData.data.email" class="form-control" id="email">
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

    <div v-else>
      <button type="button" class="btn btn-lg btn-info" v-on:click="showForm">Submit Another Job</button>

      <a :href="'/#/report?id=' + presetData.data.username">
        <button type="button" class="btn btn-success btn-lg" v-if="presetData.data.username">
          View Report
        </button>
      </a>
    </div>

    <spinner v-bind:showSpinner="showSpinner"></spinner>

  </div>

</template>

<script>
  import { ConfigConstants } from "../../models/ConfigConstants";

  export default {
    name: "create-job",
    data() {
      return {
        formVisible: true,
        successMessage: "",
        errorMessage: "",
        showSpinner: false,
        presetData: this.getDefaultPresetData()
      };
    },
    created: function () {
      if (localStorage.presetName) {
        this.presetData.name = localStorage.presetName;
        this.lookupPreset();
      }
    },
    methods: {
      getDefaultPresetData() {
        return {
          name: "",
          data: this.getDefaultForm()
        };
      },
      getDefaultForm() {
        return {
          username: "",
          email: "",
          sessionId: "",
          noOfPhotos: 5,
          noOfTimesToLoop: 10,
          timeMin: 25,
          timeMax: 30,
          maxNoOfFollowers: 500,
          hashtagText: "",
          hashtags: [],
          commentsText: "",
          comments: [],
          commentOnly: false
        };
      },
      getTotalNumberOfPosts() {
        return (
          this.presetData.data.hashtags.length *
          this.presetData.data.noOfPhotos *
          this.presetData.data.noOfTimesToLoop
        );
      },
      showForm() {
        this.formVisible = true;
      },
      hideForm() {
        this.formVisible = false;
      },
      resetMessages() {
        this.successMessage = "";
        this.errorMessage = "";
      },
      formatHashtag() {
        this.hashtagTextToArray();
        this.hashtagArrayToText();
      },
      hashtagTextToArray() {
        if (this.presetData.data.hashtagText) {
          this.presetData.data.hashtags = this.presetData.data.hashtagText
            .replaceAll(" ", "")
            .toLowerCase()
            .split(",");
        }
      },
      hashtagArrayToText() {
        if (Array.isArray(this.presetData.data.hashtags)) {
          this.presetData.data.hashtagText = this.presetData.data.hashtags.join(
            ", "
          );
        } else {
          this.presetData.data.hashtags = [];
        }
      },
      formatComments() {
        this.commentTextToArray();
        this.commentArrayToText();
      },
      commentTextToArray() {
        if (this.presetData.data.commentsText) {
          this.presetData.data.comments = this.presetData.data.commentsText.split(
            "\n"
          );
        } else {
          this.presetData.data.comments = [];
        }
      },
      commentArrayToText() {
        if (Array.isArray(this.presetData.data.comments)) {
          this.presetData.data.commentsText = this.presetData.data.comments.join(
            "\n"
          );
        }
      },
      runJob() {
        this.showSpinner = true;
        this.resetMessages();
        this.hashtagTextToArray();
        this.commentTextToArray();
        this.$http
          .post(
            `${ConfigConstants.SERVER_BASE_URL}/hashtag/loop`,
            this.presetData.data
          )
          .then(response => {
            this.hideForm();
            this.successMessage = response.bodyText;
          })
          .catch(response => {
            let errorObj = this.$_.get(response, "body.errors[0]");
            this.errorMessage = this.$_.get(errorObj, "defaultMessage");;
          })
          .finally(() => (this.showSpinner = false));
      },
      lookupPreset() {
        if (!this.presetData.name) return;
        localStorage.presetName = this.presetData.name;
        this.showSpinner = true;
        this.$http
          .get(
            `${ConfigConstants.SERVER_BASE_URL}/presets/${this.presetData.name}`
          )
          .then(response => {
            if (response && response.body) {
              this.presetData = response.body;
              this.hashtagArrayToText();
              this.commentArrayToText();
            } else {
              this.presetData = this.getDefaultPresetData();
            }
          })
          .catch(response => console.log(response))
          .finally(() => (this.showSpinner = false));
      },
      savePreset() {
        this.showSpinner = true;
        this.$http
          .post(`${ConfigConstants.SERVER_BASE_URL}/presets/`, this.presetData)
          .then(response => {
            this.successMessage = response.bodyText;
          })
          .catch(response => {
            let errorObj = response.body.errors[0];
            this.errorMessage = errorObj.defaultMessage;
          })
          .finally(() => (this.showSpinner = false));
      },
      getCommentsPlaceHolder() {
        return "Great click\nLoved it\nI love your page";
      },
      getHashtagsPlaceHolder() {
        return "BestDayEver, happyfriday, iLoveInstaBot";
      },
      isLookUpPresetDisabled() {
        return this.$_.get(this, "presetData.name", "").trim().length === 0;
      }
    }
  };
</script>

<style scoped>
  #createJob {
    text-align: left;
    font-size: 18px;
    padding-top: 20px;
    padding-bottom: 20px;
  }
</style>