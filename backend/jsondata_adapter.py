import os 
import json 

class JsonDataAdapter:
    def __init__(self, filename):
        if not os.path.exists(self.filename):
            with open(self.filename, 'w') as f:
                json.dump({}, f)
    
    def _load_data(self):
        with open(self.filename, 'r') as f:
            return json.load(f)

    def _save_data(self, data):
        with open(self.filename, 'w') as f:
            json.dump(data, f, indent=4)
    
    def get(self, key):
        data = self._load_data()
        return data.get(key)
    
    def set(self, key, value):
        data = self._load_data()
        data[key] = value
        self._save_data(data)
    
    def update(self, key, value):
        data = self._load_data()
        if key in data:
            data[key] = value
        else:
            print(f"Key '{key}' does not exist, adding new key-value pair.")
            data[key] = value
        self._save_data(data)
    
    def delete(self, key):
        data = self._load_data()
        if key in data:
            del data[key]
            self._save_data(data)
        else:
            print(f"Key '{key}' not found.")
    
    def get_all(self):
        return self._load_data()