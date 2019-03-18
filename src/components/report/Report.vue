<template>
  <div class="report">

    <div class="row">
      <div class="form-group form-inline col-md-12">
        <label for="username">Instagram Username:</label>
        <input type="text" v-model="report.username" class="form-control"
          v-on:keydown.enter="search" v-on:keydown="onKeydown" id="userName">
        <button type="button" v-on:click="search" v-bind:disabled="isSearchButtonDisabled()" class="btn btn-info">Get Report</button>
      </div>
    </div>

    <div class="row">

      <table class="table table-striped table-bordered" v-if="searchResponseText">
        <tbody>
          <tr>
              <th data-field="jobStatus" class="key">Job Status</th>
              <td data-field="jobStatus">{{report.jobStatus}}</td>
          </tr>
          <tr>
              <th data-field="startTime" class="key">Start Time</th>
              <td data-field="startTime">{{formatDate(report.startTime)}}</td>
          </tr>
          <tr v-if="report.endTime">
              <th data-field="endTime" class="key">End Time</th>
              <td data-field="endTime">{{formatDate(report.endTime)}}</td>
          </tr>
          <tr>
              <th data-field="photosLiked" class="key">Photos Liked</th>
              <td data-field="photosLiked">{{report.photosLiked}}</td>
          </tr>
          <tr>
              <th data-field="photosCommented" class="key">Photos Commented</th>
              <td data-field="photosCommented">{{report.photosCommented}}</td>
          </tr>
          <tr>
              <th data-field="currentHashtag" class="key">Current Hashtag</th>
              <td data-field="currentHashtag">{{report.currentHashtag}}</td>
          </tr>
        </tbody>
      </table>
      <div v-if="showNoResponse">
        <h4>No job is currently running for your user</h4>
        <h4 class="text-primary">If you have just triggered a job, please wait a few seconds to see the report</h4>
      </div>

    </div>

    <spinner v-bind:showSpinner="showSpinner"></spinner>

  </div>
</template>

<script>

import { ConfigConstants } from '../../models/ConfigConstants'
import dateFormat from 'dateformat'

export default {
  name: 'report',
  data() {
    return {
      searchResponseText: '',
      showNoResponse: false,
      showSpinner: false,
      report: {
        username: '',
        jobStatus: '',
        startTime: '',
        endTime: '',
        photosLiked: '',
        photosCommented: '',
        currentHashtag: ''
      }
    }
  },
  props: ['id'],
  created: function () {
    if (localStorage.username)
      this.report.username = localStorage.username;
    if (this.id)
      this.report.username = this.id;
    this.search();
  },
  methods: {
    onKeydown() {
      this.showNoResponse = false;
      this.searchResponseText = '';
    },
    search() {
      if (!this.report.username)
        return;
      localStorage.username = this.report.username;
      this.showSpinner = true;
      this.$http.get(`${ConfigConstants.SERVER_BASE_URL}/reports/${this.report.username}`)
        .then((response) => {
          this.showSpinner = false;
          if (response.bodyText) {
            this.searchResponseText = response.bodyText;
            this.report = JSON.parse(response.bodyText);
            this.showNoResponse = false;
          } else {
            this.searchResponseText = '';
            this.showNoResponse = true;
          }
        }).catch((error) => {
          this.showSpinner = false;
          this.showNoResponse = true;
          this.searchResponseText = '';
          console.log(error);
        });
    },
    formatDate(dateString) {
      if (dateString) {
        let date = new Date(dateString);
        return dateFormat(date, "dddd, mmmm dS, yyyy, h:MM:ss TT");
      }
      return '';
    },
    isSearchButtonDisabled() {
      return this.report.username.trim().length === 0;
    }
  }
}

</script>

<style scoped>
.report {
  padding: 20px;
}

</style>
