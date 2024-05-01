import pandas as pd
import RS.data_function as data_function
import RS.function as function
import RS.function as function

#https://machinelearningcoban.com/2017/05/17/contentbasedrecommendersys/

class CB(object):
    def __init__(self, movies_csv):
        self.movies = data_function.get_dataframe_movies_csv(movies_csv)
        self.tfidf_matrix = None
        self.cosine_sim = None

    def build_model(self):
        self.movies['genres'] = self.movies['genres'].str.split('|')
        self.movies['genres'] = self.movies['genres'].fillna("").astype('str')
        self.tfidf_matrix = function.tfidf_matrix(self.movies)
        self.cosine_sim = function.cosine_sim(self.tfidf_matrix)

    def refresh(self):
        self.build_model()

    def fit(self):
        self.refresh()

    def genre_recommendations(self, title, top_x):
        titles = self.movies['title']
        indices = pd.Series(self.movies.index, index=self.movies['title'])
        idx = indices[title]
        sim_scores = list(enumerate(self.cosine_sim[idx]))
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
        sim_scores = sim_scores[1:top_x + 1]
        movie_indices = [i[0] for i in sim_scores]
        return sim_scores, titles.iloc[movie_indices].values

    def print_recommendations(self, text, top_x):
        print(self.genre_recommendations(text, top_x))

    def get_recommendations(self, text, top_x):
        list_similarity, list_movies_cb = self.genre_recommendations(text, top_x)
        json_data = []
        print("[",end="")
        for i in range(top_x):
            print('{"id":',list_similarity[i][0],',"similarity":',list_similarity[i][1],',"name":"',list_movies_cb[i],'"}', end="")
            if ( i != top_x-1 ): print(",")
        print("]")
