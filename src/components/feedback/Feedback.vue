<template>

  <div id="feedback">

    <div class="alert alert-danger" role="alert" v-if="errorMessage">
      <p>{{errorMessage}}</p>
    </div>
    <div v-else-if="successMessage">
      <div class="alert alert-info" role="alert">
        <p>{{successMessage}}</p>
      </div>
    </div>

    <div v-if='formVisible'>

      <form>
        
        <div class="row">
          <div class="form-group col-md-12">
            <label for="name">Name:</label>
            <input type="text" v-model="feedback.name" class="form-control" id="name">
          </div>
        </div>

        <div class="row">
          <div class="form-group col-md-12">
            <label for="subject">Subject:</label>
            <input type="text" v-model="feedback.subject" class="form-control" id="subject">
          </div>
        </div>

        <div class="row">
          <div class="form-group col-md-12">
            <label for="sessionId">Body:</label>
            <textarea type="text" v-model="feedback.body" class="form-control" id="body" rows="5"></textarea>
          </div>
        </div>

        <div class="row">
          <div class="form-group col-md-12">
            <label for="email">Email (Optional):</label>
            <input type="text" v-model="feedback.email" class="form-control" id="email">
            <small>Please provide your email for feature requests or bugs</small>
          </div>
        </div>

        <div class="row">
          <div class="col-md-2">
            <button type="button" v-on:click="submit" v-bind:disabled="isSubmitDisabled()"
                class="btn btn-primary btn-lg">Submit</button>
          </div>
        </div>

      </form>

    </div>

    <div v-else>
      <button type="button" class="btn btn-lg btn-info"
        v-on:click="showForm">Send Another Email</button>
    </div>

    <spinner v-bind:showSpinner="showSpinner"></spinner>

  </div>

</template>

<script>
import { ConfigConstants } from '../../models/ConfigConstants';

export default {
  name: 'feedback',
  data() {
    return {
      formVisible: true,
      successMessage: '',
      errorMessage: '',
      showSpinner: false,
      feedback: this.getDefaultFeedback()
    }
  },
  methods: {
    getDefaultFeedback() {
      return {
        name: '',
        email: '',
        subject: '',
        body: ''
      }
    },
    showForm () {
        this.resetMessages();
        this.feedback = this.getDefaultFeedback();
        this.formVisible = true;
    },
    hideForm () {
      this.formVisible = false;
    },
    resetMessages() {
      this.successMessage = '';
      this.errorMessage = '';
    },
    submit() {
      this.showSpinner = true;
      this.resetMessages();
      this.$http.post(`${ConfigConstants.SERVER_BASE_URL}/feedback/send`, this.feedback)
        .then((response) => {
          this.hideForm();
          this.successMessage = response.bodyText;
        }).catch((response) => {
          let errorObj = response.body.errors[0];
          this.errorMessage = errorObj.defaultMessage;
        }).finally(() => this.showSpinner = false);
    },
    isSubmitDisabled() {
      return this.$_.get(this, "feedback.name", "").trim().length === 0
        || this.$_.get(this, "feedback.subject", "").trim().length === 0
        || this.$_.get(this, "feedback.body", "").trim().length === 0;
    }
  }
}

</script>

<style scoped>

  #feedback {
    text-align: left;
    font-size: 18px;
    padding-top: 20px;
    padding-bottom: 20px;
  }

</style>
