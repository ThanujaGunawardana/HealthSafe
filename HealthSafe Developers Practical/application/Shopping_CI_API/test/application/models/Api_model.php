<?php
class Api_model extends CI_Model
{
	function fetch_all()
	{
		$this->db->order_by('id', 'DESC');
		return $this->db->get('products');
	}

	function insert_api($data)
	{
		$this->db->insert('products', $data);
	}

	function fetch_single_product($user_id)
	{
		$this->db->where('id', $user_id);
		$query = $this->db->get('products');
		return $query->result_array();
	}

	function update_api($user_id, $data)
	{
		$this->db->where('id', $user_id);
		$this->db->update('products', $data);
	}

	function delete_single_product($user_id)
	{
		$this->db->where('id', $user_id);
		$this->db->delete('products');
		if($this->db->affected_rows() > 0)
		{
			return true;
		}
		else
		{
			return false;
		}
	}
}

?>