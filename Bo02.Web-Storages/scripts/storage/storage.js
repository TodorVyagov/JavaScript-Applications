define([], function () {
    var StorageHandler = (function () {
        function StorageHandler(name) {
            this._name = name;
        }

		StorageHandler.prototype.getLocalStorageData = function () {
			var highScore = localStorage.getItem(this._name);

			if (highScore) {
				highScore = JSON.parse(highScore);
			} else {
				highScore = [];
				localStorage.setItem(this._name, JSON.stringify(highScore));
			}

			return highScore;
		};
		
		//save player
		StorageHandler.prototype.setObject = function setObject(key, obj) {
			var highScoreList = this.getLocalStorageData();
			highScoreList.push({
				playerName: key,
				playerScore: obj
			});
			//   var jsonObj = JSON.stringify(obj);
			localStorage.setItem(this._name, JSON.stringify(highScoreList));
		};


		StorageHandler.prototype.getObject = function getObject(key) {
			if (key == null) {
				alert('User is not found. Please register now.');
				return;
			}
			var jsonObj = this.getItem(key);
			var obj = JSON.parse(jsonObj);
			return obj;
		};
			
        /*if (!Storage.prototype.viewData) {
         Storage.prototype.viewData = function viewData() {
         for (var i = 0; i < localStorage.length; i++) {
         var key = localStorage.key(i);
         var value = localStorage.getItem(key);
         alert(key + ": " + value);
         }
         };
         }*/
        StorageHandler.prototype.getHighScores = function () {
            return this.getLocalStorageData();
        };

        StorageHandler.prototype.clearLocalStorage = function () {
            localStorage.clear();
        };

        return StorageHandler;
    }());

   return StorageHandler;
});
