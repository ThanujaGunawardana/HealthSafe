<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Api extends CI_Controller {

	public function __construct()
	{
		header('Access-Control-Allow-Origin: *');
		header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
		parent::__construct();
		$this->load->model('api_model');
		$this->load->library('form_validation');
	}

	function index()
	{
		$data = $this->api_model->fetch_all();
		echo json_encode($data->result());
	}

	function insert()
	{

		$config['upload_path'] = './uploads/';
        $config['allowed_types'] = 'gif|jpg|png';
        $config['max_size'] = 2000;
        $config['max_width'] = 1500;
        $config['max_height'] = 1500;

        $this->load->library('upload', $config);

        if (!$this->upload->do_upload('imageFile')) {
            $error = array('error' => $this->upload->display_errors());

        } else {
            $data = array('image_metadata' => $this->upload->data());

        }
		// $file_name = $data['file_name'];
			
		$obj = array(
			'name'	=>	$this->input->post('name'),
			'price'		=>	$this->input->post('price'),
			'image'		=>	$this->input->post('image'),
			'stock'		=>	$this->input->post('stock')
		);
		// $alldata->image = $file_name;

		$this->api_model->insert_api($obj);

			$array = array(
				'success'		=>	true
			);
		
			
			echo json_encode($array);
	}
	
	function fetch_single()
	{
		if($this->input->post('id'))
		{
			$data = $this->api_model->fetch_single_product($this->input->post('id'));

			foreach($data as $row)
			{
				$output['name'] = $row['name'];
				$output['price'] = $row['price'];
				$output['image'] = $row['image'];
				$output['stock'] = $row['stock'];
			}
			echo json_encode($output);
		}
	}

	function update()
	{
		
			$data = array(
				'name'	=>	$this->input->post('name'),
				'price'		=>	$this->input->post('price'),
				'image'		=>	$this->input->post('image'),
				'stock'		=>	$this->input->post('stock')
			);

			$this->api_model->update_api($this->input->post('id'), $data);

			$array = array(
				'success'	=>	true,
				'data' => $data
			);
		
		echo json_encode($array);
	}

	function delete()
	{
		if($this->input->post('id'))
		{
			if($this->api_model->delete_single_product($this->input->post('id')))
			{
				$array = array(

					'success'	=>	true
				);
			}
			else
			{
				$array = array(
					'error'		=>	true
				);
			}
			echo json_encode($array);
		}
	}

}


?>