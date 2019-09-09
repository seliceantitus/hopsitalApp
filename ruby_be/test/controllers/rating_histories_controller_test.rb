require 'test_helper'

class RatingHistoriesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @rating_history = rating_histories(:one)
  end

  test "should get index" do
    get rating_histories_url, as: :json
    assert_response :success
  end

  test "should create rating_history" do
    assert_difference('RatingHistory.count') do
      post rating_histories_url, params: { rating_history: {  } }, as: :json
    end

    assert_response 201
  end

  test "should show rating_history" do
    get rating_history_url(@rating_history), as: :json
    assert_response :success
  end

  test "should update rating_history" do
    patch rating_history_url(@rating_history), params: { rating_history: {  } }, as: :json
    assert_response 200
  end

  test "should destroy rating_history" do
    assert_difference('RatingHistory.count', -1) do
      delete rating_history_url(@rating_history), as: :json
    end

    assert_response 204
  end
end
