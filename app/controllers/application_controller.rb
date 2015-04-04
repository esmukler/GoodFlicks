class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :current_user, :is_logged_in, :require_logged_in

  def current_user
    @current_user ||= User.find_by_session_token(session[:session_token])
  end

  def is_logged_in
    !!current_user
  end

  def log_in(user)
    @current_user = user
    session[:session_token] = user.reset_session_token!
  end

  def logout
    if current_user == User.find_by_username("demo_user")
      reset_demo(current_user)
    else
      if current_user
        current_user.reset_session_token!
      end
    end
    session[:session_token] = nil
  end

  def require_logged_in
    redirect_to new_session_url unless is_logged_in
  end

  def reset_demo(user)
    user.destroy
    new_demo = User.create!(username: "demo_user", password: "demo_password")
    relationship = Relationship.create!(follower_id: new_demo.id, followed_id: 1)
    hitchcock = Library.create!(user_id: new_demo.id, title: "Hitchcock",
                                is_public: true)
    vertigo = Movie.find_by_title("Vertigo")
    add_vertigo = LibraryMovie.create!(library_id: hitchcock.id, movie_id: vertigo.id)
    psycho = Movie.find_by_title("Psycho")
    add_psycho = LibraryMovie.create!(library_id: hitchcock.id, movie_id: psycho.id)
    new_review = Review.create!(user_id: new_demo.id, movie_id: psycho.id,
                                num_stars: 3, body: "Well, I guess I can't take showers anymore!",
                                is_public: true)
    other_review = Review.create!(user_id: new_demo.id, movie_id: vertigo.id,
                                num_stars: 5, body: "This is a great San Francisco movie!",
                                is_public: true)

  end



end
