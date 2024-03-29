import pandas as pd
# import data_function as get_dataframe_movies_csv
# import function as tfidf_matrix
# import function as cosine_sim
from sklearn.metrics.pairwise import linear_kernel
from sklearn.feature_extraction.text import TfidfVectorizer

#https://machinelearningcoban.com/2017/05/17/contentbasedrecommendersys/

def tfidf_matrix(movies):
    tf = TfidfVectorizer(analyzer='word', ngram_range=(1, 1), min_df=0.01)
    new_tfidf_matrix = tf.fit_transform(movies['genres'])
    return new_tfidf_matrix


def cosine_sim(matrix):
    new_cosine_sim = linear_kernel(matrix, matrix)
    return new_cosine_sim

def get_dataframe_movies_csv(text):
    movie_cols = ['movie_id', 'title', 'genres']
    movies = pd.read_csv(text, sep=',', names=movie_cols, encoding='latin-1')
    return movies

class CB(object):
    def __init__(self, movies_csv):
        self.movies = get_dataframe_movies_csv(movies_csv)
        self.tfidf_matrix = None
        self.cosine_sim = None

    def build_model(self):
        self.movies['genres'] = self.movies['genres'].str.split('|')
        self.movies['genres'] = self.movies['genres'].fillna("").astype('str')
        self.tfidf_matrix = tfidf_matrix(self.movies)
        self.cosine_sim = cosine_sim(self.tfidf_matrix)

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
        for i in list_similarity:
            print(i)
        print('----')
        for i in list_movies_cb:
            print(i)