var newJobsVue = new Vue({
    el: '#new-jobs',
    data: {
      jobs: []
    },
    methods: {
      ready: function () {
          var self = this;
          return $.ajax({
            method: 'GET',
            url: 'https://api.indeed.com/ads/apisearch',
            crossDomain: true,
            dataType: 'jsonp',
            data: {
              'v': '2', 
              'format': 'json', 
              'publisher': "9049151526441005",
              q: 'javascript',
              l: '94112',
              userip: 'localhost',
              useragent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2)',
              latlong: '1'
            }
          })
          .done(function(response){
            //render the jobs from the search_response
            console.log("response is>>>>>", response.results);
            self.jobs = response.results;
          })
          .fail(function(error){
            console.log("error is>>>", error);
          });
      }
    }, 
    mounted(){
      this.ready();
    }
  });